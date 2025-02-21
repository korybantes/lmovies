import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo2.png';

export const Sidenav = ({ menuset, menuhendlaer }) => {
  const sidenavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        menuhendlaer(); // Closes the sidebar when clicking outside
      }
    };

    if (menuset) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuset]);

  return (
    <div
      ref={sidenavRef}
      className={`fixed top-0 z-[100] h-screen overflow-y-auto transition-all duration-500 w-[280px] bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900 transform ${
        menuset ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={menuhendlaer}
          aria-label="Close sidebar"
          className="absolute top-4 right-4 p-2 text-2xl text-yellow-400 hover:text-amber-200 transition-colors duration-300"
        >
          &times;
        </button>

        {/* Logo Section */}
        <div className="group flex items-center mb-12 space-x-4 transform hover:scale-105 transition-transform duration-300">
          <img 
            className="w-16 h-16 rounded-full border-2 border-yellow-400/30 hover:border-yellow-400 transition-all duration-300"
            src={logo} 
            alt="Logo" 
          />
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
            l-movies
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-3">
          <h1 className="text-sm uppercase tracking-widest text-yellow-400/80 mb-6 animate-pulse">
            Discover Cinematic Universe
          </h1>
          
          {[
            { to: '/trending', icon: 'ri-fire-fill', text: 'Trending' },
            { to: '/popular', icon: 'ri-bard-fill', text: 'Popular' },
            { to: '/movie', icon: 'ri-movie-2-fill', text: 'Movies' },
            { to: '/tv', icon: 'ri-slideshow-3-fill', text: 'TV Shows' },
            { to: '/person', icon: 'ri-team-fill', text: 'People' },
            { to: '/MovieProvider', icon: 'ri-clapperboard-fill', text: 'Providers' },
          ].map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.text}
              className="flex items-center p-4 space-x-4 rounded-xl hover:bg-gray-800/60 hover:shadow-lg transition-all duration-300 group hover:pl-6"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <i className={`${item.icon} text-2xl text-yellow-400 group-hover:text-amber-200 transition-colors duration-300`} />
              <span className="text-lg font-medium text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                {item.text}
              </span>
              <div className="flex-1 border-b border-yellow-400/10 group-hover:border-yellow-400/30 transition-all duration-500" />
            </Link>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400 animate-text-gradient">
              Crafted with <span className="text-red-500">♥</span> by korybantes
            </p>
            <a
              href="https://www.github.com/korybantes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full hover:bg-gray-800 transition-all duration-300 hover:rotate-12"
            >
              <i className="ri-github-fill text-xl text-gray-400 hover:text-yellow-400 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};