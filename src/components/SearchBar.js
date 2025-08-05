import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchHistory = [] }) => {
  const [city, setCity] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (cityName) => {
    setCity(cityName);
    onSearch(cityName);
    setShowHistory(false);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-sm relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setShowHistory(true)}
            placeholder="Şehir adı girin..."
            className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-yellow-400/50 focus:bg-white/20 transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-6 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Ara
          </button>
        </div>
      </form>

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden z-10">
          <div className="p-2">
            <h3 className="text-white/80 text-sm font-semibold mb-2 px-2">Son Aramalar</h3>
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(item.city)}
                className="w-full text-left px-3 py-2 text-white hover:bg-white/20 rounded-xl transition-colors duration-200 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{item.city}</div>
                  <div className="text-white/60 text-sm">{item.country}</div>
                </div>
                <div className="text-white/40 text-xs">
                  {formatDate(item.timestamp)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close history */}
      {showHistory && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowHistory(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
