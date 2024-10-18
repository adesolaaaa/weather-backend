import React, { useState, useEffect } from 'react';
import './App.css';  // For custom styles

function App() {
  const [city, setCity] = useState('');  // For user-entered city
  const [weather, setWeather] = useState(null);  // Weather data
  const [error, setError] = useState('');  // Error message
  const [searchHistory, setSearchHistory] = useState([]);  // City search history
  const [detectedCity, setDetectedCity] = useState('');  // Detected city from geolocation

  // Use Geolocation API to detect user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      });
    } else {
      console.log("Geolocation is not available");
    }
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setError('');
        setSearchHistory((prev) => [...new Set([city, ...prev])].slice(0, 5));  // Keep last 5 cities
      } else {
        setWeather(null);
        setError(data.error);
      }
    } catch (err) {
      setError('Error fetching weather data');
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setDetectedCity(data.city);  // Set detected city name
        setError('');
      } else {
        setWeather(null);
        setError(data.error);
      }
    } catch (err) {
      setError('Error fetching weather data');
    }
  };

  const getWeatherAdvice = () => {
    if (!weather) return '';

    const temp = weather.temperature;

    if (temp < 5) {
      return "Don't forget your coat!";
    } else if (temp >= 5 && temp <= 15) {
      return "It's a bit chilly, wear a jacket!";
    } else if (temp > 15 && temp <= 25) {
      return "The weather is mild, enjoy your day!";
    } else {
      return "It's hot, stay hydrated!";
    }
  };

  const handleBackground = () => {
    if (!weather) return '';
    if (weather.description.includes('rain')) return 'rainy-bg';
    if (weather.description.includes('clear')) return 'sunny-bg';
    return 'default-bg';
  };

  return (
    <div className={`weather-app ${handleBackground()}`}>
      {/* Always display the title */}
      <h1>Weather App</h1>

      {/* Display detected location if geolocation is used */}
      {detectedCity && (
      <p className="detected-location">Seems like you're in {detectedCity}</p>
    )}

      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Always display the weather info if weather data is available */}
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>{weather.description}</p>
          <img 
            src={`http://openweathermap.org/img/wn/${weather.icon}.png`} 
            alt={weather.description} 
          />
          <p style={{ fontStyle: 'italic', marginTop: '10px' }}>{getWeatherAdvice()}</p>  {/* Display advice */}
        </div>
      )}

      <h3>Recent Searches</h3>
      <div>
        {searchHistory.map((city, index) => (
          <button key={index} onClick={() => setCity(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
