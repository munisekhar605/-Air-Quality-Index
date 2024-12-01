import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import AQIDisplay from './components/AQIDisplay';
import ChartView from './components/ChartView';
import RoundChart from './components/RoundChart';
import DaysChart from './components/DaysChart';
import { fetchAQIData } from './api';
import './App.css'
const App = () => {
  const [aqiData, setAQIData] = useState(null);
  const [dataForAll,setDataForAll]=useState(null)
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    setError('');
    try {
      const response = await fetchAQIData(city);
      if (response.status === 'ok') {
        const { data } = response;
         setAQIData({
          city: data.city.name,
          aqi: data.aqi,
          dominantPollutant: data.dominentpol,
          temperature: data.iaqi.t?.v || 'N/A',
          humidity: data.iaqi.h?.v || 'N/A',
          pressure: data.iaqi.p?.v || 'N/A',
          lastUpdated: data.time.s,
        });
        setDataForAll({
          o3:data.forecast.daily.o3,
          uvi:data.forecast.daily.uvi,
          pm10:data.forecast.daily.o3,
          pm25:data.forecast.daily.pm25
        })
      } else {
        setError('City not found or API error');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="App">
      <h3 className='main-heading'>@Air Quality Index (AQI) Search</h3>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {aqiData && (
        <>
        <AQIDisplay data={aqiData} />
        <DaysChart data={dataForAll}/>
        <div className='flex'> 
          <ChartView data={aqiData} />
          <RoundChart data={aqiData}/>
        </div>
          <div className="footer-container">
           <div>@email:munisekhar605@gmail.com</div>
           <div></div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
