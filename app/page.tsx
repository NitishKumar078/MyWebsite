"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import WaveBackground from "./components/waveBackground";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center relative overflow-hidden">
      <WaveBackground />
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
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
