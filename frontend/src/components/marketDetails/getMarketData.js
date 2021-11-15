import fetch from 'node-fetch';
export const getMarketData = async (symbol, ref) => {
    const url = `https://localhost:5000/api/order/${symbol}`;
    const data = await fetch(url);
    return await data.json();
}