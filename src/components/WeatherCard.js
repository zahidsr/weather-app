import React from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const getWeatherIcon = (description) => {
    const icons = {
      'açık': '☀️',
      'az bulutlu': '🌤️',
      'parçalı bulutlu': '⛅',
      'kapalı': '☁️',
      'sisli': '🌫️',
      'yoğun sisli': '🌫️',
      'hafif çisenti': '🌦️',
      'çisenti': '🌧️',
      'yoğun çisenti': '🌧️',
      'hafif yağmur': '🌦️',
      'yağmur': '🌧️',
      'şiddetli yağmur': '⛈️',
      'hafif kar': '🌨️',
      'kar': '❄️',
      'şiddetli kar': '❄️',
      'gök gürültülü fırtına': '⛈️'
    };
    return icons[description] || '🌤️';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('tr-TR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="w-full">
      {/* Location Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">
          {weatherData.name}
        </h2>
        <p className="text-white/80 text-lg">
          {weatherData.sys.country}
        </p>
        <p className="text-white/60 text-sm">
          {formatDate(weatherData.timestamp)}
        </p>
      </div>

      {/* Main Weather Display */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-6">
        {/* 3D Weather Illustration */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">
            {getWeatherIcon(weatherData.weather[0].description)}
          </div>
        </div>

        {/* Temperature */}
        <div className="text-center mb-4">
          <div className="text-7xl font-bold text-white mb-2">
            {Math.round(weatherData.main.temp)}°
          </div>
          <p className="text-xl text-white/80 mb-2">
            Hissedilen: {Math.round(weatherData.main.feels_like)}°
          </p>
          <p className="text-2xl font-semibold text-white capitalize">
            {weatherData.weather[0].description}
          </p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">Nem</p>
            <p className="text-white font-semibold">
              {weatherData.main.humidity}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">Rüzgar</p>
            <p className="text-white font-semibold">
              {Math.round(weatherData.wind.speed)} km/s
            </p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">Basınç</p>
            <p className="text-white font-semibold">
              {weatherData.main.pressure} hPa
            </p>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm mb-1">Yağış Olasılığı</p>
            <p className="text-white font-semibold">
              {weatherData.main.precipitation_probability}%
            </p>
          </div>
        </div>

        {/* Current Time */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🕐</div>
          <p className="text-white/80 text-sm">Güncellenme Zamanı</p>
          <p className="text-white font-semibold">
            {formatTime(weatherData.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
