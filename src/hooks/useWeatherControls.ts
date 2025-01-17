import { useState, useEffect, useCallback } from 'react';
import { useWeatherData } from './useWeatherData';
import { useSessionMetrics } from './useSessionMetrics';

interface WeatherControls {
  rainIntensity: number;
  cloudDensity: number;
  windSpeed: number;
}

const TRANSITION_DURATION = 3000; // 3 seconds in milliseconds

export const useWeatherControls = () => {
  const { weatherData } = useWeatherData();
  const sessionMetrics = useSessionMetrics();
  const [controls, setControls] = useState<WeatherControls>({
    rainIntensity: 0.5,
    cloudDensity: 0.6,
    windSpeed: 0.3,
  });

  // Calculate weather controls based on real weather data
  const calculateWeatherControls = useCallback((): WeatherControls => {
    if (!weatherData) return controls;

    const baseControls = {
      rainIntensity: weatherData.weatherType === 'rain' ? 0.8 : 0.2,
      cloudDensity: weatherData.weatherType === 'clouds' ? 0.8 : 
                   weatherData.weatherType === 'rain' ? 0.7 : 0.3,
      windSpeed: Math.min(Math.abs(weatherData.temperature) / 30, 1) * 0.8,
    };

    // Adjust based on session duration
    const intensityMultiplier = sessionMetrics.totalTime > 900 ? 1.25 : // >15 minutes
                               sessionMetrics.totalTime > 600 ? 1.15 : // >10 minutes
                               sessionMetrics.totalTime > 300 ? 1 : // >5 minutes
                               0.8; // Default

    return {
      rainIntensity: Math.min(baseControls.rainIntensity * intensityMultiplier, 1),
      cloudDensity: Math.min(baseControls.cloudDensity * intensityMultiplier, 1),
      windSpeed: Math.min(baseControls.windSpeed * intensityMultiplier, 1),
    };
  }, [weatherData, sessionMetrics.totalTime]);

  // Smooth transition between weather states
  useEffect(() => {
    if (!sessionMetrics.isActive) {
      // Reset to default values when inactive
      setControls({
        rainIntensity: 0.5,
        cloudDensity: 0.6,
        windSpeed: 0.3,
      });
      return;
    }

    const targetControls = calculateWeatherControls();
    const startControls = { ...controls };
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1);

      // Ease function for smooth transition
      const ease = (t: number) => t * t * (3 - 2 * t);
      const eased = ease(progress);

      setControls({
        rainIntensity: startControls.rainIntensity + (targetControls.rainIntensity - startControls.rainIntensity) * eased,
        cloudDensity: startControls.cloudDensity + (targetControls.cloudDensity - startControls.cloudDensity) * eased,
        windSpeed: startControls.windSpeed + (targetControls.windSpeed - startControls.windSpeed) * eased,
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [weatherData, sessionMetrics.isActive, calculateWeatherControls]);

  return controls;
};