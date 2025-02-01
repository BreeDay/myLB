"use client"; // Marks this component as a client component
import React, { useState, useEffect } from 'react';

export const LogoTicker = () => {
    const [games, setGames] = useState<string[] | null>(null); // Initialize as null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/games', {
                    method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGames(data); 
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); 


    return (
        <section className='bg-red-800 py-2 text-white'>
          <div className="">
            <div className='flex items-center gap-5'>
              <div className='flex-1 m-5 text-center justify-items-start'>
                <h2>Past Games:</h2>
              </div>
            {games ? (
                <div className='flex overflow-hidden [mask-text:linear-gradient(to-right,transparent,black_20%,black_80%,transparent)]'>
                  <div className="flex flex-none gap-8">
                  {Object.values(games).map((game, index) => (
                      <p key={index}>{game}</p>
                  ))}
                </div>
                </div>
            ) : (
                <div className='flex-1 justify-items-start'>Loading data...</div>
            )}
            </div>
            </div>
        </section>
    );
};