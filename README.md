# 🌤️ Weather App

Modern ve kullanıcı dostu bir hava durumu uygulaması. React ve Tailwind CSS kullanılarak geliştirilmiştir.

## ✨ Özellikler

### 🌍 Hava Durumu Bilgileri
- **Anlık Hava Durumu**: Sıcaklık, hissedilen sıcaklık, nem, rüzgar hızı
- **Detaylı Bilgiler**: Basınç, yağış olasılığı
- **Hava Durumu Açıklamaları**: Türkçe hava durumu tanımları
- **Güncellenme Zamanı**: Verilerin ne zaman güncellendiği bilgisi

### 📍 Konum Özellikleri
- **Şehir Arama**: Dünya genelinde şehir arama
- **Mevcut Konum**: GPS ile otomatik konum tespiti
- **Arama Geçmişi**: Son 5 arama kaydı (localStorage'da saklanır)

### 📊 Tahmin Özellikleri
- **Saatlik Tahmin**: Önümüzdeki 12 saat için detaylı tahmin
- **7 Günlük Tahmin**: Haftalık hava durumu öngörüsü
- **Yağış Olasılığı**: Her saat ve gün için yağış olasılığı

### 🎨 Kullanıcı Arayüzü
- **Modern Tasarım**: Glass morphism efektleri
- **Responsive**: Mobil ve masaüstü uyumlu
- **Animasyonlar**: Smooth geçişler ve hover efektleri
- **Türkçe Arayüz**: Tamamen Türkçe kullanıcı deneyimi

### ⚡ Teknik Özellikler
- **Gerçek Zamanlı Veri**: Open-Meteo API kullanımı
- **Hata Yönetimi**: Kullanıcı dostu hata mesajları
- **Loading States**: Veri yüklenirken görsel geri bildirim
- **Offline Desteği**: Arama geçmişi yerel olarak saklanır

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd weather-app
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Uygulamayı başlatın**
```bash
npm start
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 🛠️ Kullanılan Teknolojiler

- **React 19**: Modern React hooks ve functional components
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Open-Meteo API**: Ücretsiz hava durumu verisi
- **Geolocation API**: Tarayıcı konum servisleri

## 📱 Kullanım

### Şehir Arama
1. Ana ekranda şehir adını girin
2. "Ara" butonuna tıklayın
3. Hava durumu bilgileri görüntülenecek

### Mevcut Konum
1. "Mevcut Konumumu Kullan" butonuna tıklayın
2. Tarayıcı konum izni isteyecek
3. İzin verildikten sonra otomatik olarak hava durumu yüklenecek

### Arama Geçmişi
- Son aradığınız 5 şehir kaydedilir
- Arama kutusuna tıkladığınızda geçmiş görünür
- Geçmişten bir şehre tıklayarak hızlı erişim

### Tahmin Görüntüleme
- **Saatlik**: Önümüzdeki 12 saat için detaylı tahmin
- **7 Günlük**: Haftalık hava durumu öngörüsü
- Tab'lar arasında geçiş yaparak farklı tahminleri görüntüleyin

## 🔧 API Bilgileri

Uygulama [Open-Meteo](https://open-meteo.com/) API'sini kullanır:
- **Ücretsiz**: API key gerektirmez
- **Yüksek Doğruluk**: Global hava durumu verileri
- **Türkçe Desteği**: Türkçe şehir isimleri ve açıklamalar

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── SearchBar.js          # Arama çubuğu ve geçmiş
│   ├── WeatherCard.js        # Ana hava durumu kartı
│   ├── WeatherForecast.js    # Tahmin bileşeni
│   ├── LoadingSpinner.js     # Yükleme animasyonu
│   └── ErrorMessage.js       # Hata mesajları
├── App.js                    # Ana uygulama bileşeni
├── index.js                  # Uygulama giriş noktası
└── index.css                 # Global stiller
```

## 🎯 Gelecek Özellikler

- [ ] Hava kalitesi indeksi
- [ ] UV indeksi
- [ ] Gün doğumu/batımı saatleri
- [ ] Favori şehirler
- [ ] Push notifications
- [ ] Dark/Light tema
- [ ] Widget desteği

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun
