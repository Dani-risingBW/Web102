import { Component, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function CoinDetail() {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    async function fetchCoinDetails() {
      const details = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`)
      const detailsJson = await details.json()

      const description = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`)
      const descriptionJson = await description.json()

      setFullDetails({
        numbers: detailsJson.DISPLAY,
        textData: descriptionJson.Data
      })
    }

    fetchCoinDetails().catch(console.error)
  }, [symbol])

  if (!fullDetails) return <div>Loading...</div>;

  return (
    
    <div>
      <h1>{fullDetails.textData[symbol]?.FullName}</h1>
      <img 
        className="images"
        src={`https://www.cryptocompare.com/${fullDetails.numbers[symbol]?.USD?.IMAGEURL}`}
        alt={`Small icon for ${symbol} crypto coin`}
      />
      <div>{fullDetails.textData[symbol]?.Description}</div>
      <br />
      <div>
        This coin was built with the algorithm{" "}
        {fullDetails.textData[symbol]?.Algorithm}
      </div>
      <table className="coin-detail-table">
        <tbody> 
          <tr>
            <th>Launch Date </th>
            <td> </td>
          </tr>
          <tr>
            <th>Website </th>
            <td> </td>
          </tr>
          <tr>
            <th>Whitepaper </th>
            <td> </td>
          </tr>
          <tr>
            <th>Monetary Symbol </th>
            <td> </td>
          </tr>
          <tr>
            <th>Market </th>
            <td> </td>
          </tr>
          <tr>
            <th>Last Transaction </th>
            <td> </td>
          </tr>
          <tr>
            <th>Last Transaction Value</th>
            <td> </td>
          </tr>
          <tr>
            <th>Volume </th>
            <td> </td>
          </tr>
          <tr>
            <th>Today's Open Price </th>
            <td> </td>
          </tr>
          <tr>
            <th>Highest Price during the Day </th>
            <td> </td>
          </tr>
          <tr>
            <th>Lowest Price during the Day </th>
            <td> </td>
          </tr>
          <tr>
            <th>Change from Previous Day </th>
            <td> </td>
          </tr>
          <tr>
            <th>Market Cap </th>
            <td> </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CoinDetail;
