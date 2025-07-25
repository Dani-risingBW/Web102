import { useState, useEffect } from 'react';
import CoinInfo from './components/CoinInfo';
import SideNav from './components/SideNav';
import './App.css';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" 
        + API_KEY
      )
    const json = await response.json()
    setList(json)
    }
    fetchAllCoinData().catch(console.error);

  }, [])
  
  const searchItems = searchValue => {
  setSearchInput(searchValue)
  if (searchValue !== "") {
    const filteredData = Object.keys(list.Data).filter((item) => 
      Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    setFilteredResults(filteredData)
  } else {
    setFilteredResults(Object.keys(list.Data))
  }
}
  return (
    <div className="whole-page">
      <SideNav />
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        className="searchbar"
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <ul>
        {searchInput.length > 0
          ? filteredResults
              .map((coin) => {
                const coinData = list.Data[coin]
                if (
                  coinData.IsTrading &&
                  coinData.Algorithm !== "N/A" &&
                  coinData.ProofType !== "N/A"
                ) {
                  return (
                    <CoinInfo
                      key={coin}
                      image={coinData.ImageUrl}
                      name={coinData.FullName}
                      symbol={coinData.Symbol}
                    />
                  )
                }
                return null
              })
          : list &&
            Object.entries(list.Data)
              .filter(
                ([_, coinData]) =>
                  coinData.IsTrading &&
                  coinData.Algorithm !== "N/A" &&
                  coinData.ProofType !== "N/A"
              )
              .slice(0, 20)
              .map(([coin, coinData]) => (
                <CoinInfo
                  key={coin}
                  image={coinData.ImageUrl}
                  name={coinData.FullName}
                  symbol={coinData.Symbol}
                />
              ))}
      </ul>
    </div>
  )
}

export default App
