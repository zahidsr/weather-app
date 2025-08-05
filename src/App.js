import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Konum alınamadı:', error);
          setError('Konum erişimi reddedildi. Lütfen manuel olarak şehir arayın.');
        }
      );
    } else {
      setError('Tarayıcınız konum özelliğini desteklemiyor.');
    }
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError(null);

      // Get current weather
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,pressure_msl,apparent_temperature,precipitation_probability&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

      const weatherResponse = await axios.get(weatherUrl);
      
      // Get location name from coordinates
      const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=tr`;
      const geocodingResponse = await axios.get(geocodingUrl);
      
      const locationName = geocodingResponse.data.name || 'Bilinmeyen Konum';
      const country = geocodingResponse.data.country || '';

      const processedWeatherData = processWeatherData(weatherResponse.data, locationName, country);
      const processedForecastData = processForecastData(weatherResponse.data);

      setWeatherData(processedWeatherData);
      setForecastData(processedForecastData);

      // Add to search history
      addToSearchHistory(locationName, country);

    } catch (error) {
      console.error('Hava durumu verisi alınamadı:', error);
      setError('Hava durumu verisi alınamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      // First find city coordinates
      const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=tr&format=json`;
      
      const geocodingResponse = await axios.get(geocodingUrl);
      
      if (!geocodingResponse.data.results || geocodingResponse.data.results.length === 0) {
        setError('Şehir bulunamadı! Lütfen geçerli bir şehir adı girin.');
        setLoading(false);
        return;
      }
      
      const location = geocodingResponse.data.results[0];
      const { latitude, longitude } = location;
      
      // Get weather data
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,pressure_msl,apparent_temperature,precipitation_probability&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

      const weatherResponse = await axios.get(weatherUrl);
      
      const processedWeatherData = processWeatherData(weatherResponse.data, location.name, location.country);
      const processedForecastData = processForecastData(weatherResponse.data);

      setWeatherData(processedWeatherData);
      setForecastData(processedForecastData);

      // Add to search history
      addToSearchHistory(location.name, location.country);

    } catch (error) {
      console.error('Hata detayı:', error.response?.data || error.message);
      setError(`Hava durumu verisi alınamadı: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const processWeatherData = (data, cityName, country) => {
    const current = data.current;
    return {
      name: cityName,
      sys: { country },
      weather: [{ 
        description: getWeatherDescription(current.weather_code),
        code: current.weather_code
      }],
      main: {
        temp: current.temperature_2m,
        feels_like: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        pressure: Math.round(current.pressure_msl),
        precipitation_probability: current.precipitation_probability
      },
      wind: {
        speed: current.wind_speed_10m
      },
      timestamp: new Date().toISOString()
    };
  };

  const processForecastData = (data) => {
    const hourly = data.hourly;
    const daily = data.daily;
    
    // Process hourly forecast (next 24 hours)
    const hourlyForecast = [];
    const now = new Date();
    for (let i = 0; i < 24; i++) {
      const time = new Date(hourly.time[i]);
      if (time > now) {
        hourlyForecast.push({
          time: time,
          temp: hourly.temperature_2m[i],
          weather_code: hourly.weather_code[i],
          precipitation_probability: hourly.precipitation_probability[i]
        });
      }
    }

    // Process daily forecast (next 7 days)
    const dailyForecast = [];
    for (let i = 0; i < 7; i++) {
      dailyForecast.push({
        date: new Date(daily.time[i]),
        max_temp: daily.temperature_2m_max[i],
        min_temp: daily.temperature_2m_min[i],
        weather_code: daily.weather_code[i],
        precipitation_probability: daily.precipitation_probability_max[i]
      });
    }

    return {
      hourly: hourlyForecast.slice(0, 24),
      daily: dailyForecast
    };
  };

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: "açık",
      1: "az bulutlu",
      2: "parçalı bulutlu",
      3: "kapalı",
      45: "sisli",
      48: "yoğun sisli",
      51: "hafif çisenti",
      53: "çisenti",
      55: "yoğun çisenti",
      61: "hafif yağmur",
      63: "yağmur",
      65: "şiddetli yağmur",
      71: "hafif kar",
      73: "kar",
      75: "şiddetli kar",
      95: "gök gürültülü fırtına"
    };
    return descriptions[code] || "bilinmeyen";
  };

  const addToSearchHistory = (cityName, country) => {
    const newEntry = { city: cityName, country, timestamp: new Date().toISOString() };
    const updatedHistory = [newEntry, ...searchHistory.filter(item => item.city !== cityName)].slice(0, 5);
    setSearchHistory(updatedHistory);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 text-white">
        <span className="text-sm font-medium">{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {error && (
          <ErrorMessage message={error} onClose={clearError} />
        )}

        {!weatherData ? (
          // Welcome Screen
          <div className="text-center animate-fade-in">
            {/* 3D Weather Illustration */}
            <div className="mb-8 relative">
              <div className="text-8xl mb-4 transform hover:scale-110 transition-transform duration-300 animate-float">
                ☀️
              </div>
              <div className="absolute -top-4 -right-4 text-4xl opacity-80 animate-pulse-slow">
                ☁️
              </div>
              <div className="absolute -bottom-4 -left-4 text-3xl opacity-60 animate-bounce-slow">
                🌧️
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-2">
              Weather
            </h1>
            <p className="text-2xl font-semibold text-yellow-300 mb-8">
              App
            </p>
            
            <SearchBar onSearch={fetchWeather} searchHistory={searchHistory} />
            
            {/* Location Button */}
            <button
              onClick={getCurrentLocation}
              className="w-150 mt-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl px-6 py-3 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>📍</span>
              <span>Mevcut Konumumu Kullan</span>
            </button>
            <h1 className="mt-10 text-5xl font-bold text-white mb-2">
              AZY
            </h1>
          </div>
        ) : (
          // Weather Display Screen
          <div className="w-full max-w-md animate-slide-up">
            <WeatherCard weatherData={weatherData} />
            
            {forecastData && (
              <WeatherForecast forecastData={forecastData} />
            )}
            
            {/* Bottom Navigation */}
            <div className="flex justify-center items-center mt-8 space-x-8">
              <button 
                onClick={getCurrentLocation}
                className="text-white/60 hover:text-white transition-colors p-2"
                title="Mevcut Konum"
              >
                📍
              </button>
              <button 
                onClick={() => {
                  setWeatherData(null);
                  setForecastData(null);
                  setError(null);
                }}
                className="bg-yellow-400 text-purple-900 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg hover:scale-110 transition-transform"
                title="Yeni Arama"
              >
                +
              </button>
              <button 
                onClick={() => {
                  setWeatherData(null);
                  setForecastData(null);
                  setError(null);
                }}
                className="text-white/60 hover:text-white transition-colors p-2"
                title="Ana Menü"
              >
                ☰
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default App;
