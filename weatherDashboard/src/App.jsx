import { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';

// Predefined list of cities for random selection
const cityList = [
  { city: 'New York', country: 'US' },
  { city: 'London', country: 'GB' },
  { city: 'Tokyo', country: 'JP' },
  { city: 'Sydney', country: 'AU' },
  { city: 'Paris', country: 'FR' },
  { city: 'Berlin', country: 'DE' },
  { city: 'Moscow', country: 'RU' },
  { city: 'Beijing', country: 'CN' },
  { city: 'Rio de Janeiro', country: 'BR' },
  { city: 'Cape Town', country: 'ZA' },
  { city: 'Toronto', country: 'CA' },
  { city: 'Mumbai', country: 'IN' },
  { city: 'Seoul', country: 'KR' },
  { city: 'Mexico City', country: 'MX' },
  { city: 'Bangkok', country: 'TH' },
  { city: 'Dubai', country: 'AE' },
  { city: 'Los Angeles', country: 'US' },
  { city: 'Chicago', country: 'US' },
  { city: 'Miami', country: 'US' },
  { city: 'Singapore', country: 'SG' },
];

// Mock data for fallback
const mockData = {
  data: Array.from({ length: 20 }, (_, i) => ({
    city_name: `Mock City ${i + 1}`,
    temp: 20 + i,
    weather: { description: i % 3 === 0 ? 'Clear sky' : i % 3 === 1 ? 'Cloudy' : 'Rain', icon: 'c01d' },
  })),
};

// Simple function to shuffle an array and pick N items
const getRandomItems = (array, numItems) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numItems);
};

function App() {
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);
  const [useMockData, setUseMockData] = useState(false);

  const apiKey = import.meta.env.VITE_WEATHERBIT_API_KEY;

  const fetchWeatherData = async (retryCount = 3, retryDelay = 2000) => {
    console.log('Starting fetchWeatherData, API Key:', apiKey ? 'Loaded' : 'Missing');
    if (!apiKey) {
      setError('Weatherbit API key is missing. Please check your environment variables.');
      setUseMockData(true);
      setLoading(false); // Ensure loading is reset
      return;
    }

    setLoading(true);
    setError(null);
    setApiCalled(false);

    const cities = getRandomItems(cityList, 20);
    const promises = cities.map(({ city, country }) =>
      fetch(
        `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&key=${encodeURIComponent(apiKey)}`,
        {
          headers: { Accept: 'application/json' },
        }
      )
        .then(async (response) => {
          console.log(`API Response Status for ${city}:`, response.status);
          if (!response.ok) {
            const errorText = await response.text();
            console.log(`API Error Response for ${city}:`, errorText);
            throw new Error(`HTTP error for ${city}! Status: ${response.status}, Details: ${errorText}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error(`Error fetching data for ${city}:`, error.message);
          return null;
        })
    );

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        console.log(`Attempt ${attempt} - Initiating API calls for ${cities.length} cities...`);
        const responses = await Promise.all(promises);
        setApiCalled(true);

        const validData = responses
          .filter((response) => response && response.data && response.data.length > 0)
          .map((response) => response.data[0]);

        if (validData.length > 0) {
          setList(validData);
          setDisplayList(getRandomItems(validData, Math.min(10, validData.length)));
          setLoading(false);
          console.log('Fetch successful, data length:', validData.length);
          return;
        } else {
          throw new Error('No valid weather data returned.');
        }
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error.message);
        if (attempt === retryCount) {
          setError(`Failed to fetch weather data after ${retryCount} attempts: ${error.message}`);
          setUseMockData(true);
        }
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
    setLoading(false); // Ensure loading is reset even on failure
    console.log('Fetch completed, loading set to false');
  };

  useEffect(() => {
    console.log('useEffect triggered, useMockData:', useMockData);
    if (useMockData) {
      setList(mockData.data);
      setDisplayList(getRandomItems(mockData.data, 10));
      setLoading(false);
      setApiCalled(true);
      console.log('Using mock data, list length:', mockData.data.length);
      return;
    }
    fetchWeatherData();
  }, [useMockData]);

  // Calculate summary statistics
  const totalCities = displayList.length;
  const temperatures = displayList.map((item) => item.temp).filter((temp) => typeof temp === 'number');
  const meanTemperature = temperatures.length
    ? (temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length).toFixed(1)
    : 'N/A';
  const temperatureRange =
    temperatures.length
      ? `${Math.min(...temperatures)}°C to ${Math.max(...temperatures)}°C`
      : 'N/A';

  return (
    <div className="App">
      <div className="Navigation">
        <h1>Weather Dashboard</h1>
        <div className="nav-links">
          <a href="#weather">Current Weather</a>
          <a href="#forecast">Forecast</a>
          <a href="#historical">Historical</a>
        </div>
      
        <section className="section" id="weather">
          <h2>Current Weather</h2>
          {loading ? (
            <p>Loading weather data...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : apiCalled && list.length === 0 ? (
            <p>No weather data returned from API.</p>
          ) : (
            <>
              <p>API Call Status: {apiCalled ? (useMockData ? 'Using Mock Data' : 'Successful') : 'Not yet called'}</p>
              <div className="summary-stats">
                <p>Total Cities: {totalCities}</p>
                <p>Average Temperature: {meanTemperature}°C</p>
                <p>Temperature Range: {temperatureRange}</p>
              </div>
              
            </>
          )}
        </section>
        <section className="section" id="forecast">
          <h2>Forecast</h2>
          <p>Forecast data will be displayed here.</p>
        </section>
        <section className="section" id="historical">
          <h2>Historical Weather</h2>
          <p>Historical weather data will be displayed here.</p>
        </section>
        
      </div>
      <div className="weather-card-section">
        <h2>Weather Cards</h2>
        <WeatherCard defaultDisplayList={displayList} />
        <p className="footer">Data provided by Weatherbit. © 2025 Weatherbit</p>
      </div>
      
    </div>
  );
}

export default App;