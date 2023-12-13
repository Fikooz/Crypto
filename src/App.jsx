import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const CRYPTO_LIST = ["bitcoin", "ethereum", "ripple"]; // Add more cryptocurrencies as needed

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}?vs_currency=usd&ids=${CRYPTO_LIST.join(",")}`
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Cryptocurrency Dashboard</h1>
      <div className="crypto-list">
        {cryptoData.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

const CryptoCard = ({ crypto }) => {
  return (
    <div className="crypto-card">
      <h2>{crypto.name}</h2>
      <img src={crypto.image} alt={crypto.name} className="crypto-image" />
      <p>Symbol: {crypto.symbol}</p>
      <p>Current Price: ${crypto.current_price}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default App;
