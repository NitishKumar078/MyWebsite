"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import WaveBackground from "./components/waveBackground";

export default function Home() {
  const skills = [
    {
      label: "web application",
      title: "what I did in building web application",
      icon: "🌐",
    },
    {
      label: "window application",
      title: "what I know about Window",
      icon: "💻",
    },
    {
      label: "browser extension",
      title: "what I know about browser extension",
      icon: "🧩",
    },
  ];
  return (
    <div className="min-h-screen flex items-center relative overflow-hidden">
      <WaveBackground />
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="grid md:grid-cols-[60%_40%] gap-12 items-center">
          <div>
            <h1 className="font-jetbrains text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Hi, I&apos;m Nitish
            </h1>
            <h2 className="font-jetbrains text-3xl text-slate-700 dark:text-slate-200 mb-6">
              Software Developer & Aspiring Full-Stack Developer
            </h2>
            <p className="font-inter text-xl text-slate-600 dark:text-slate-300 mb-8">
              Turning ideas into innovative solutions
            </p>
            <ul className="flex flex-wrap gap-4 mb-8">
              {skills.map((item) => (
                <li key={item.label}>
                  <span
                    title={item.title}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-white cursor-pointer"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <span className="text-white">View My Work</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
