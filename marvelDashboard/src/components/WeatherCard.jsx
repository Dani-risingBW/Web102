import React, { useState } from 'react';

function WeatherCard({  defaultDisplayList = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherFilter, setWeatherFilter] = useState('All');

  const weatherToShow = defaultDisplayList
    .filter((weather) =>
      weather.city_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((weather) =>
      weatherFilter === 'All' || weather.weather?.description.toLowerCase().includes(weatherFilter.toLowerCase())
    );

  const getWeatherIconUrl = (icon) => {
    if (!icon) return 'https://via.placeholder.com/10'; // Updated to 10px
    return `https://www.weatherbit.io/static/img/icons/${icon}.png`;
  };

  // Get unique weather conditions for filter dropdown
  const weatherConditions = [
    'All',
    ...new Set(defaultDisplayList.map((item) => item.weather?.description).filter(Boolean)),
  ];

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={weatherFilter}
          onChange={(e) => setWeatherFilter(e.target.value)}
        >
          {weatherConditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>
      <h3>Current Weather ☀️🌧️</h3>
      {weatherToShow.length > 0 ? (
        <ul>
          {weatherToShow.map((weather) => (
            <li key={`${weather.city_name}-${weather.state_code || weather.country_code}`}>
              <div className="weather-item">
                <img
                  src={getWeatherIconUrl(weather.weather?.icon)}
                  alt={weather.weather?.description || 'Weather icon'}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/10')} // Updated to 10px
                />
                <span>
                  {weather.city_name}: {weather.temp}°C, {weather.weather?.description || 'No description'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No weather data found. Try another city or filter!</p>
      )}
    </div>
  );
}

export default WeatherCard;