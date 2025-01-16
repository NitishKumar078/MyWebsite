import React, { useState } from 'react';
import { ArrowRight, Cloud, CloudRain, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import WaveBackground from '../components/WaveBackground';

export default function Home() {
  const [weatherControls, setWeatherControls] = useState({
    rainIntensity: 0.5,
    cloudDensity: 0.6,
    windSpeed: 0.3
  });

  return (
    <div className="min-h-screen flex items-center relative overflow-hidden">
      <WaveBackground {...weatherControls} />
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="grid md:grid-cols-[60%_40%] gap-12 items-center">
          <div>
            <h1 className="font-jetbrains text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Hi, I'm Nitish
            </h1>
            <h2 className="font-jetbrains text-3xl text-slate-700 dark:text-slate-200 mb-6">
              Software Developer & Aspiring Full-Stack Developer
            </h2>
            <p className="font-inter text-xl text-slate-600 dark:text-slate-300 mb-8">
              Turning ideas into innovative web solutions
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="absolute bottom-8 right-8 flex gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <CloudRain className="w-5 h-5 text-slate-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={weatherControls.rainIntensity}
                onChange={(e) => setWeatherControls(prev => ({
                  ...prev,
                  rainIntensity: parseFloat(e.target.value)
                }))}
                className="w-24 accent-primary"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Cloud className="w-5 h-5 text-slate-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={weatherControls.cloudDensity}
                onChange={(e) => setWeatherControls(prev => ({
                  ...prev,
                  cloudDensity: parseFloat(e.target.value)
                }))}
                className="w-24 accent-primary"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Wind className="w-5 h-5 text-slate-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={weatherControls.windSpeed}
                onChange={(e) => setWeatherControls(prev => ({
                  ...prev,
                  windSpeed: parseFloat(e.target.value)
                }))}
                className="w-24 accent-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}