import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';
import cors from 'cors';

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const API_URL = "https://statsapi.mlb.com/api/v1/schedule?sportId=1&season=2024&gameType=R";

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

    const apiData = await fetchDataFromApi(API_URL);
    if (!apiData) {
        console.error("Failed to fetch data from the MLB API");
        return;
    }

    const addDataToDb = (gameData, vector_db, data_id_counter) => {
        let away_team = gameData?.teams?.away?.team?.name || "N/A";
        let home_team = gameData?.teams?.home?.team?.name || "N/A";
        let away_score = gameData?.teams?.away?.score || "0";
        let home_score = gameData?.teams?.home?.score || "0";
        let data_string = `${away_team} vs ${home_team}: ${away_score}-${home_score}`;
        vector_db[String(data_id_counter)] = data_string;
        return { newDb: vector_db, newCounter: data_id_counter + 1 };
    };

    let vector_db = {};
    let data_id_counter = 0;
    if (apiData && apiData.dates) {
        for (const dateData of apiData.dates) {
            if (dateData.games) {
                for (const gameData of dateData.games) {
                    const { newDb, newCounter } = addDataToDb(gameData, vector_db, data_id_counter);
                    vector_db = newDb;
                    data_id_counter = newCounter;
                }
            }
        }
    }

    app.post('/games', async (req, res) => {
        res.send(vector_db);
    });
}

run();