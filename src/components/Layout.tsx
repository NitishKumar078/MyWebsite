import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
    { path: "/resume", label: "Resume" },
    { path: "/contact", label: "Contact" },
  ];

  return (
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
              to="/"
              className="text-2xl font-bold font-jetbrains text-primary"
            >
              Nitish
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-inter text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors duration-200 ${
                    location.pathname === item.path ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>

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
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 shadow-lg">
              <div className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-inter text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors duration-200 ${
                      location.pathname === item.path ? "text-primary" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-16">{children}</main>

      <footer className="bg-slate-50 dark:bg-slate-800 py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center font-inter text-slate-600 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Nitish. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
