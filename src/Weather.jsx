import React, { useEffect, useState } from 'react';
import background from './Images/background.jpg';
import cityImage from './Images/city.jpg';
import sun from './Images/icons8-sun.gif';
import getWeather from './api/AxiosApi.jsx';
import snowFlake from './Images/snowflake.png';
import cloud from './Images/WeatherIcons.gif'
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

    console.log(snowFlake, cloud , sun)
  const handleSearch = async () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await getWeather(city);
      setWeatherData(data);
    } catch (error) {
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const updateDateTime = () => {
    const date = new Date();
    const day = date.getDate();
    const dayName = date.toLocaleString('default', { weekday: 'long' });
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const time =
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    setCurrentDate(`${dayName}, ${day} ${month} ${year}`);
    setCurrentTime(time);
  };

  useEffect(() => {
    updateDateTime();

    // Update time every second
    const interval = setInterval(updateDateTime, 1000);

    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getWeather('Delhi');
        setWeatherData(data);
      } catch (error) {
        setError('Failed to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className='overflow-x-hidden relative'>
      <img
        src={background}
        alt='Background'
        className='absolute top-0 left-0 object-cover w-full h-full z-0'
      />
      <div className='relative z-10 flex flex-col md:flex-row justify-center items-center space-x-4 p-6 gap-6'>
        <div className='flex flex-col md:flex-row justify-center items-center space-x-4 p-6 gap-6'>
          {/* City Image Box */}
          <div className='flex items-stretch relative w-full md:w-1/2'>
            <h1 className='absolute top-4 right-10 text-white'>{weatherData && weatherData.name}</h1>
            <h1 className='absolute top-4 right-4 text-white'>{weatherData && weatherData.sys.country}</h1>
            <img
              src={cityImage}
              alt='City'
              className='w-full h-full object-cover shadow-lg rounded-lg'
            />
            <div className='absolute bottom-4 left-4 text-white space-y-1'>
              <p className='text-lg font-semibold'>{currentDate}</p>
              <p className='text-lg'>{currentTime}</p>
            </div>
            <div>
              <p className='text-4xl mt-2 absolute bottom-4 right-4 text-white'>
                {weatherData && weatherData.main.temp
                  ? weatherData.main.temp.toFixed(1)
                  : ''}°C
              </p>
            </div>
          </div>

          {/* Weather Information Box */}
          <div className='bg-black bg-opacity-70 p-6 rounded-lg shadow-xl text-white flex items-stretch w-full md:w-1/2'>
            <div className='flex flex-col justify-between w-full'>
              <div className='text-center'>
                {/* Weather Icon based on Temperature */}
                <div>
                  {weatherData && weatherData.main.temp !== undefined ? (
                    weatherData.main.temp < 10 ? (
                      <img
                        src={snowFlake}
                        alt='Snow'
                        className='w-20 h-20 mx-auto shadow-lg rounded-lg'
                      />
                    ) : weatherData.main.temp >= 10 || weatherData.main.temp <= 20 ? (
                      <img
                        src={cloud}
                        alt='Cloud'
                        className='w-20 h-20 mx-auto shadow-lg rounded-lg'
                      />
                    ) : (
                      <img
                        src={sun}
                        alt='Sun'
                        className='w-20 h-20 mx-auto shadow-lg rounded-lg'
                      />
                    )
                  ) : null}
                </div>

                <div className='my-4'>
                  {loading ? (
                    <h1 className='text-3xl font-bold'>Loading...</h1>
                  ) : error ? (
                    <h1 className='text-3xl font-bold text-red-500'>{error}</h1>
                  ) : weatherData ? (
                    <h1 className='text-3xl font-bold'>
                      {weatherData.weather[0].description}
                    </h1>
                  ) : (
                    <h1 className='text-3xl font-bold'>
                      Enter a city to get weather data
                    </h1>
                  )}
                </div>

                <div className='my-4 w-full h-0.5 bg-gray-300'></div>

                <div className='w-full'>
                  <input
                    type='text'
                    placeholder='Enter City'
                    className='p-3 rounded-lg shadow-lg border border-gray-300 bg-black bg-opacity-10 text-white placeholder-white'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                  <button
                    onClick={handleSearch}
                    className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
                  >
                    Get Weather
                  </button>
                </div>

                <div className='my-4'>
                  {weatherData && !loading && !error ? (
                    <>
                      <h1 className='text-2xl font-bold'>
                        {weatherData.name}, {weatherData.sys.country}
                      </h1>
                      <div className='my-4 w-full h-0.5 bg-gray-300'></div>

                      <div className='flex items-center justify-between my-4'>
                        <p>Temperature</p>
                        <p className='text-lg mt-2'>
                          {weatherData.main.temp}°C
                        </p>
                      </div>

                      <div className='my-4 w-full h-0.5 bg-gray-300'></div>

                      <div className='flex items-center justify-between'>
                        <p>Humidity</p>
                        <p className='text-lg mt-2'>
                          {weatherData.main.humidity}% 
                        </p>
                      </div>

                      <div className='my-4 w-full h-0.5 bg-gray-300'></div>

                      <div className='flex items-center justify-between'>
                        <p>Visibility</p>
                        <p className='text-lg mt-2'>
                          {weatherData.visibility}m
                        </p>
                      </div>

                      <div className='my-4 w-full h-0.5 bg-gray-300'></div>

                      <div className='flex items-center justify-between'>
                        <p>Wind Speed</p>
                        <p className='text-lg mt-2'>
                          {weatherData.wind.speed}m/s
                        </p>
                      </div>
                    </>
                  ) : (
                    <h1 className='text-3xl font-bold'>
                      Enter a city to get weather data
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
