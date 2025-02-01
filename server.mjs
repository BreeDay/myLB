const PORT = 8000
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';


const app = express()
app.use(cors())
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



// Helper Function
const fetchDataFromApi = async (api_url) => {
  try {
    const response = await fetch(api_url);
    response.raise_for_status;
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

const addDataToDb = (gameData, vector_db, data_id_counter) => {
    let away_team = gameData?.teams?.away?.team?.name || "N/A";
    let home_team = gameData?.teams?.home?.team?.name || "N/A";
    let away_score = gameData?.teams?.away?.score || "N/A";
    let home_score = gameData?.teams?.home?.score || "N/A";
    let data_string = `${away_team} vs ${home_team}: ${away_score}-${home_score}`;
    vector_db[String(data_id_counter)] = data_string;
    return {newDb : vector_db, newCounter: data_id_counter+1}

}


const searchData = (vector_db) => {
  let results = "";
  for (const key in vector_db) {
      if(vector_db.hasOwnProperty(key)){
          results = results + vector_db[key] + "\n";
      }
  }
  return results;
};


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }


  // Initialize Google Gemini
  const GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
  if (!GOOGLE_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
  }
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  
  const API_URL = "https://statsapi.mlb.com/api/v1/schedule?sportId=1&season=2024&gameType=R";


  // Fetch data from API
  const apiData = await fetchDataFromApi(API_URL);
    if (!apiData) {
        return res.status(500).json({ error: "Failed to fetch data from the MLB API" });
    }
  // Store Data into vector db
  let vector_db = {};
  let data_id_counter = 0;
    if (apiData && apiData.dates) {
        for (const dateData of apiData.dates) {
            if (dateData.games) {
                for (const gameData of dateData.games) {
                    const { newDb, newCounter } = addDataToDb(gameData, vector_db, data_id_counter);
                    vector_db = newDb;
                    data_id_counter = newCounter
                }
            }
        }
    }

    console.log("db", vector_db)


  // Get User Query (from req.body)
  const analysis_tasks = req.body.queries;
    if (!analysis_tasks) {
        return res.status(400).json({ error: "No analysis tasks provided" });
      }


  const responses = [];
  // Process Each Query

  for (const user_query of analysis_tasks) {
        const retrieved_data = searchData(vector_db);

    const prompt = `
          You have been provided data about the following games:

          ${retrieved_data}

          The data is in the format "Away Team vs Home Team: Away Score - Home Score".
          
          Based on this information, answer the following question: ${user_query}
      `;
    
    try{
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        responses.push({query: user_query, response: responseText})
        await new Promise(resolve => setTimeout(resolve, 2000));

    }
    catch (error) {
        console.error("Error during Gemini processing:", error);
        responses.push({query: user_query, response: "Error processing query"});
    }
  }
    console.log(responses)
    console.log("logging")

    res.status(200).json({ responses });
}