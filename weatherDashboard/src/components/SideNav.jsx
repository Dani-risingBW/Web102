import React from 'react'


function SideNav({ displayList, loading, error, apiCalled, useMockData }) {
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
        <div>
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
        </div>
    )
}

export default SideNav
