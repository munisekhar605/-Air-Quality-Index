import React from 'react';
import './AQIDisplay.css'
const AQIDisplay = ({ data }) => {
  const { humidity, lastUpdated, pressure, temperature,dominantPollutant,aqi,city} = data;

  return (
    <div className="aqi-display">
      <h2>{city}</h2>
      <p>AQI: {aqi}</p>
      <p>Main Pollutant: {dominantPollutant}</p>
      <p>Temperature: {temperature}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Pressure: {pressure} hPa</p>
    </div>
  );
};

export default AQIDisplay;