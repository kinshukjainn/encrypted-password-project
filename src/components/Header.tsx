import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaInstagram, FaLock } from "react-icons/fa";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            aria-label="Password Generator Home"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
              <FaLock className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight font-mono text-white group-hover:text-purple-400 transition-colors">
              <span className="hidden sm:inline">Password Generator</span>
              <span className="sm:hidden">PwdGen</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-lg transition-colors ${
                location.pathname === "/" 
                  ? "text-purple-400 font-medium" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Generator
            </Link>
            <Link
              to="/about"
              className={`text-lg transition-colors ${
                location.pathname === "/about" 
                  ? "text-purple-400 font-medium" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              About
            </Link>
              <a
              href="https://cloudkinshuk.in"
              className=" py-3 hover:text-yellow-500 text-center text-lg">
              @creator site 
            </a>
            <a
              href="https://blog.cloudkinshuk.in"
              className=" py-3 hover:text-yellow-500 text-center text-lg">
              @Kinshuk Blogs
            </a>
            
            {/* Social Links */}
            <div className="flex items-center space-x-5 pl-4 border-l border-gray-700">
              <a
                href="https://github.com/kinshukjainn/Encrypted-password-genrated"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://instagram.com/kinshukjain._"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram Profile"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link
              to="/"
              className={`block py-3 text-center text-lg ${
                location.pathname === "/" 
                  ? "text-purple-400 font-medium" 
                  : "text-gray-300"
              }`}
            >
              Generator
            </Link>
            <Link
              to="/about"
              className={`block py-3 text-center text-lg ${
                location.pathname === "/about" 
                  ? "text-purple-400 font-medium" 
                  : "text-gray-300"
              }`}
            >
              About
            </Link>
            <a
              href="https://cloudkinshuk.in"
              className={`block py-3 text-center text-lg ${
                location.pathname === "/about" 
                  ? "text-purple-400 font-medium" 
                  : "text-gray-300"
              }`}
            >
              @creator site 
            </a>
            <a
              href="https://blog.cloudkinshuk.in"
              className={`block py-3 text-center text-lg ${
                location.pathname === "/about" 
                  ? "text-purple-400 font-medium" 
                  : "text-gray-300"
              }`}
            >
              @creator Blogs 
            </a>
            
            {/* Social Links - Mobile */}
            <div className="flex justify-center space-x-8 pt-4 border-t border-gray-800">
              <a
                href="https://github.com/kinshukjainn/Encrypted-password-genrated"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white p-2"
                aria-label="GitHub Repository"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://instagram.com/kinshukjain._"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 p-2"
                aria-label="Instagram Profile"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
