'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface StockDataItem {
    rank?: number;
    symbol: string;
    name: string;
    marketCap: string;
    price: number;
    change: number;}
export default function Stock() {
    const [symbol, setSymbol] = useState('');
    const [country, setCountry] = useState('');
    const [stockData, setStockData] = useState<StockDataItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const fetchStockData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://www.alphavantage.co/query`, {
                params: {
                    function: 'SYMBOL_SEARCH',
                    keywords: symbol,
                    apikey: apiKey
                }
            });

            if (response.data.Note) {
                throw new Error(response.data.Note);
            }

            const matches = response.data.bestMatches;
            const filteredData = matches.filter((match) => match['4. region'] === country);

            const detailedData = await Promise.all(filteredData.map(async (match) => {
                const symbol = match['1. symbol'];
                const quoteResponse = await axios.get(`https://www.alphavantage.co/query`, {
                    params: {
                        function: 'GLOBAL_QUOTE',
                        symbol: symbol,
                        apikey: apiKey
                    }
                });

                const quoteData = quoteResponse.data['Global Quote'];
                return {
                    name: match['2. name'],
                    symbol: match['1. symbol'],
                    marketCap: 'N/A', // Alpha Vantage free tier does not provide market cap
                    price: parseFloat(quoteData['05. price']),
                    change: parseFloat(quoteData['10. change percent'].slice(0, -1))
                };
            }));

            setStockData(detailedData);
        } catch (err) {
            setError(err.message || 'Failed to fetch stock data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (symbol && country) {
            fetchStockData();
        }
    }, [symbol, country]);

    return (
        

        <div className="flex flex-col items-center gap-[25px] text-white font-normal text-sm leading-[1.42857]"> 
            <input className="w-[282px] h-[32px] px-[6px] pt-[0px] pb-[2px] border border-2 rounded-[12px] border-custom-white min-h-[32px] p-[4px_6px]" 
            type="text" 
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            />
            <input className="w-[282px] h-[32px] px-[6px] pt-[0px] pb-[2px] border border-2 rounded-[12px] border-custom-white min-h-[32px] p-[4px_6px]" 
            type="text" 
            placeholder="Enter symbol or name"
            value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
            />
<button onClick={fetchStockData} className="mt-4 p-2 bg-grey-500 rounded">
                Fetch Stock Data
            </button>

            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {stockData.length > 0 && (<div className="flex flex-row items-center justify-center gap-[25px] mt-20 mb-[300px]">
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
            #
        </p>
        <p>{stockData[0].rank || 0}</p>
        </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Symbol
        </p>
        <p>{stockData[0].symbol}</p>
        </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Name
        </p>
        <p>{stockData[0].name}</p>
        </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Capitalization
        </p>
        <p>${stockData[0].marketCap}$</p>
        </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Price
        </p>
        <p>${stockData[0].price.toFixed(2)} USD</p>
        </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Price change per day        </p>
        <p className="text-custom-green">{stockData[0].change.toFixed(2)}%</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-[25px]">
        <p>
        Price change per month        
        </p>
        <p className="text-custom-red">{stockData[0].change.toFixed(2)}%</p>
    </div>
</div>
 )}
<div>
    
</div>
        </div>
    )
}