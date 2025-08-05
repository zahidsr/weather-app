import React, { useState } from 'react';

const WeatherForecast = ({ forecastData }) => {
  const [activeTab, setActiveTab] = useState('hourly');

  const getWeatherIcon = (weatherCode) => {
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

    const description = descriptions[weatherCode] || 'bilinmeyen';
    return icons[description] || '🌤️';
  };

  const formatHour = (date) => {
    return new Date(date).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDay = (date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      weekday: 'short'
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <div className="w-full mb-6">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
        {/* Tab Navigation */}
        <div className="flex mb-6 bg-white/10 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('hourly')}
            className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'hourly'
                ? 'bg-yellow-400 text-purple-900'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Saatlik
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'daily'
                ? 'bg-yellow-400 text-purple-900'
                : 'text-white/60 hover:text-white'
            }`}
          >
            7 Günlük
          </button>
        </div>

        {/* Hourly Forecast */}
        {activeTab === 'hourly' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Saatlik Tahmin</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {forecastData.hourly.slice(0, 12).map((hour, index) => (
                <div key={index} className="flex-shrink-0 bg-white/10 rounded-2xl p-4 text-center min-w-[80px]">
                  <p className="text-white font-semibold text-lg mb-1">
                    {Math.round(hour.temp)}°
                  </p>
                  <div className="text-2xl mb-1">
                    {getWeatherIcon(hour.weather_code)}
                  </div>
                  <p className="text-white/80 text-sm mb-1">
                    {formatHour(hour.time)}
                  </p>
                  <p className="text-white/60 text-xs">
                    {hour.precipitation_probability}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Forecast */}
        {activeTab === 'daily' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">7 Günlük Tahmin</h3>
            <div className="space-y-3">
              {forecastData.daily.map((day, index) => (
                <div key={index} className="flex items-center justify-between bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getWeatherIcon(day.weather_code)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {formatDay(day.date)}
                      </p>
                      <p className="text-white/60 text-sm">
                        {formatDate(day.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">
                        {Math.round(day.max_temp)}°
                      </span>
                      <span className="text-white/60">
                        {Math.round(day.min_temp)}°
                      </span>
                    </div>
                    <p className="text-white/60 text-xs">
                      {day.precipitation_probability}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast; 