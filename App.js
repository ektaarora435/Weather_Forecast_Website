import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'YOUR_API_KEY';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: location,
          appid: apiKey,
          units: 'metric', // Request data in metric units (Celsius)
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.city.name} Weather Forecast</h2>
          {weatherData.list.map((item, index) => (
            <div key={index} className="forecast-item">
              <p>Date: {item.dt_txt}</p>
              <p>Temperature: {item.main.temp} °C</p>
              <p>Description: {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
