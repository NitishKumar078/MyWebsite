import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  weatherType: 'clear' | 'rain' | 'clouds';
  isDay: boolean;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

interface WeatherControls {
  rainIntensity: number;
  cloudDensity: number;
  windSpeed: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
let weatherCache: { data: WeatherData; timestamp: number } | null = null;

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      // Check cache first
      if (weatherCache && Date.now() - weatherCache.timestamp < CACHE_DURATION) {
        setWeatherData(weatherCache.data);
        return;
      }

      // Get user's location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Fetch weather data from OpenWeatherMap API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      
      if (!response.ok) throw new Error('Weather data fetch failed');
      
      const data = await response.json();

      // Process weather data
      const weatherData: WeatherData = {
        temperature: data.main.temp - 273.15, // Convert from Kelvin to Celsius
        weatherType: data.weather[0].main.toLowerCase(),
        isDay: data.dt > data.sys.sunrise && data.dt < data.sys.sunset,
        season: getSeason(new Date(), position.coords.latitude > 0),
      };

      // Update cache
      weatherCache = {
        data: weatherData,
        timestamp: Date.now(),
      };

      setWeatherData(weatherData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    }
  };

  return { weatherData, error, refetch: fetchWeatherData };
};

// Helper function to determine season
function getSeason(date: Date, isNorthernHemisphere: boolean): WeatherData['season'] {
  const month = date.getMonth();
  
  // Adjust season based on hemisphere
  if (isNorthernHemisphere) {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  } else {
    if (month >= 2 && month <= 4) return 'autumn';
    if (month >= 5 && month <= 7) return 'winter';
    if (month >= 8 && month <= 10) return 'spring';
    return 'summer';
  }
}