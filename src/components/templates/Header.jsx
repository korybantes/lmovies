import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ data }) => {
  return (
    <div className="relative z-50 w-full"> {/* Main container */}
      {/* Background Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ 
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
            zIndex: 1
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-transparent to-transparent backdrop-blur-sm"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Content Layer */}
      <div 
        className="relative h-[80vh] sm:h-[70vh] flex flex-col justify-end items-start p-8 sm:p-12 space-y-6"
        style={{ zIndex: 3 }}
      >
        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-bold max-w-4xl leading-tight animate-text-shine bg-[linear-gradient(110deg,#eab308,45%,#f59e0b,55%,#eab308)] bg-[length:250%_100%] bg-clip-text text-transparent">
          {data?.original_title || data?.name || data?.title || data?.original_name}
        </h1>

        {/* Overview */}
        <div className="glass-container p-6 rounded-2xl backdrop-blur-xl max-w-2xl transition-all duration-500 hover:bg-gray-900/40">
          <p className="text-lg sm:text-xl text-gray-200 font-light leading-relaxed">
            {data?.overview?.slice(0, 200)}...
            <Link 
              to={`/${data?.media_type}/details/${data?.id}`} 
              className="ml-2 inline-flex items-center text-yellow-400 hover:text-amber-200 transition-colors duration-300"
            >
              Explore more
              <i className="ri-arrow-right-up-line ml-2 text-lg animate-arrow" />
            </Link>
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-3 hover:bg-gray-800/50 px-4 py-2 rounded-full transition-all duration-300">
            <i className="ri-calendar-event-fill text-yellow-400 text-xl animate-pulse" />
            <span className="text-gray-200 font-medium">
              {data?.release_date || "Coming Soon"}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 hover:bg-gray-800/50 px-4 py-2 rounded-full transition-all duration-300">
            <i className="ri-film-fill text-yellow-400 text-xl animate-pulse" />
            <span className="text-gray-200 font-medium uppercase tracking-wide">
              {data?.media_type}
            </span>
          </div>
        </div>

        {/* Trailer Button */}
        <Link
          to={`/${data?.media_type}/details/${data?.id}`}
          className="mt-6 px-8 py-4 flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 rounded-full transition-all duration-500 hover:scale-105 shadow-glow"
        >
          <i className="ri-play-circle-fill text-2xl text-black animate-ping-slow" />
          <span className="text-lg font-bold text-black">Watch Now!</span>
          <i className="ri-arrow-right-s-line text-xl text-black ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};