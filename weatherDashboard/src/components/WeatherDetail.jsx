import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "./SideNav";
const API_KEY = import.meta.env.VITE_WEATHERBIT_API_KEY;

function WeatherDetail() {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    async function fetchWeatherDetails() {
      // 1. Get current weather
      const currentResponse = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${symbol}&key=${API_KEY}`
      );
      const currentJson = await currentResponse.json();
      console.log("Weatherbit API Key:", API_KEY);
      // 2. Get 7-day forecast
      const forecastResponse = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${symbol}&key=${API_KEY}`
      );
      const forecastJson = await forecastResponse.json();

      setFullDetails({
        current: currentJson.data[0],
        forecast: forecastJson.data,
      });
      
    }
    fetchWeatherDetails().catch(console.error);
  }, [symbol]);

  if (!fullDetails) return <div>Loading...</div>;

  return (
    <div className="weather-detail">
      <SideNav displayList={[fullDetails.current]} />
      <div className="weather-detail-container">
        <h1>{fullDetails.current.city_name}</h1>
        <p>Temperature: {fullDetails.current.temp}°C</p>
        <p>Weather: {fullDetails.current.weather.description}</p>
        <h2>7-Day Forecast</h2>
        <ul className="weather-detail-forecast-list">
          {fullDetails.forecast.map((day) => (
            <li key={day.valid_date}>
              <span>{day.valid_date}</span>
              <span>{day.weather.description}, {day.temp}°C</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WeatherDetail;
