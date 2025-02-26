import { ArrowRight, Cloud, CloudRain, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import WaveBackground from "../components/WaveBackground";
import { useWeatherControls } from "../hooks/useWeatherControls";

export default function Home() {
  const weatherControls = useWeatherControls();
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="min-h-screen flex items-center relative overflow-hidden">
      <WaveBackground {...weatherControls} isDark={isDark} />
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
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${weatherControls.rainIntensity * 100}%` }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Cloud className="w-5 h-5 text-slate-600" />
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${weatherControls.cloudDensity * 100}%` }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Wind className="w-5 h-5 text-slate-600" />
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${weatherControls.windSpeed * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
