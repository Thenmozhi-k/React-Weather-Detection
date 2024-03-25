
import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import search from '../Assets/Assets/search.png';
import clear from '../Assets/Assets/clear.png';
import cloud from '../Assets/Assets/cloud.png';
import drizzle from '../Assets/Assets/drizzle.png';
import rain from '../Assets/Assets/rain.png';
import snow from '../Assets/Assets/snow.png';
import wind from '../Assets/Assets/wind.png';
import humidity from '../Assets/Assets/humidity.png';

const WeatherApp = () => {
  
  const api_Key = '7dba0c97532436081c02d45a5ffeb137';
  const [Wicon, setWicon] = useState(cloud);
  const [enteredLocation, setEnteredLocation] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (cityInput === '') {
      setError('Please enter a location');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metrics&appid=${api_Key}`;
      const response = await fetch(url);

      if (!response.ok) {
        setError('Location not found. Please enter a valid location.');
        return;
      }

      const data = await response.json();

      const humidityElement = document.getElementsByClassName('humidity-percent');
      const windElement = document.getElementsByClassName('wind-rate');
      const temperatureElement = document.getElementsByClassName('weather-temp');
      const locationElement = document.getElementsByClassName('location');

      humidityElement[0].innerHTML = data.main.humidity + '%';
      windElement[0].innerHTML = data.wind.speed + 'Km/h';
      temperatureElement[0].innerHTML = data.main.temp + '°c';
      locationElement[0].innerHTML = data.name;

    
      setEnteredLocation(data.name);

    
      if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
        setWicon(clear);
      } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
        setWicon(cloud);
      } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
        setWicon(drizzle);
      } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
        setWicon(drizzle);
      } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        setWicon(rain);
      } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        setWicon(rain);
      } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        setWicon(snow);
      } else {
        setWicon(clear);
      }

    
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type='text'
          className='cityInput'
          placeholder='search'
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <div className='search-icon' onClick={fetchData}>
          <img src={search} alt='' />
        </div>
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='weather-img'>
        <img src={Wicon} alt='' />
      </div>

      <div className='weather-temp'>34°c</div>

      <div className='location'>
        {enteredLocation}
      </div>

      <div className='data-container'>
        <div className='element'>
          <img src={humidity} className='icon' alt='' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>

        <div className='element'>
          <img src={wind} className='icon' alt='' />
          <div className='data'>
            <div className='wind-rate'>18km/h</div>
            <div className='text'>Wind</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
