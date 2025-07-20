"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  Moon,
  Menu,
  X,
  Mail,
  Github,
  Linkedin,
  // Twitter,
} from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setHasMounted(true);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    // { path: "/learnings", label: "Learnings" },
    { path: "/blog", label: "Blog" },
    // { path: "/resume", label: "Resume" },
    // { path: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:nitishkumar562@.com",
      label: "Email",
      color: "hover:text-blue-500",
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/NitishKumar078",
      label: "GitHub",
      color: "hover:text-blue-500",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/nitish-kumar-m",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    // {
    //   icon: <Twitter className="w-5 h-5" />,
    //   href: "https://twitter.com/yourusername",
    //   label: "Twitter",
    //   color: "hover:text-blue-400",
    // },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className={`min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200`}
        >
          <header
            className={`fixed w-full z-50 transition-all duration-200 ${
              isScrolled
                ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md"
                : ""
            }`}
          >
            <div className="mx-auto px-6">
              <nav className="flex items-center justify-between h-4 m-4">
                <Link
                  href="/"
                  className="text-2xl font-bold font-jetbrains text-primary"
                >
                  Nitish
                </Link>
                <span className="bg-blue-50 px-4 rounded-full flex items-center align-middle shadow-sm hover:bg-blue-100 transition-all duration-300 transform hover:-translate-y-1 ml-2 text-xl font-bold text-gray-900">
                  {hasMounted ? formatTime(currentTime) : "00:00:00 AM"}
                </span>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-5 gap-2 px-4 py-2 rounded-4xl bg-slate-100 dark:bg-slate-800">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`font-inter px-2 text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors duration-200 ${
                        pathname === item.path ? "text-primary" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                {/* Mobile Navigation */}
                <button
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </nav>

              {/* Mobile Menu */}
              <div
                className={`md:hidden fixed bg-white dark:bg-slate-900 w-screen  ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col p-4 space-y-4 sm:px-5 shadow-lg">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="relative text-gray-700 block px-3 py-2 text-base font-medium  dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <main className="pt-16">{children}</main>

          {/* Fixed Contact Sidebar */}
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
            <div className="flex flex-col gap-4 p-3 rounded-full bg-white/10 dark:bg-slate-800/10 backdrop-blur-md shadow-lg border border-white/20 dark:border-slate-700/20">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-white/20 hover:scale-125 dark:bg-slate-800/20 hover:bg-white/40 dark:hover:bg-slate-700/40 transition-all duration-300 group ${link.color}`}
                  aria-label={link.label}
                >
                  {link.icon}
                  <span className="fixed right-16 py-1  px-2 rounded bg-white dark:bg-slate-800 text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Glass Effect Footer */}
          <footer className="relative mt-auto">
            <div className="mt-8 pt-6 border-t border-slate-200/20 dark:border-slate-700/20 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} Nitish. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
