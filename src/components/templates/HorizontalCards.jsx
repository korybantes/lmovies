import React from "react";
import { Link, useLocation } from "react-router-dom";
import noimg from "/noimg.jpg";
import { RiFireFill, RiStarFill, RiMovie2Fill } from "react-icons/ri";

function HorizontalCards({ data }) {
  const { pathname } = useLocation();
  
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={
              d.season_number
                ? `${pathname}/season/${d.season_number}`
                : `/${d.media_type === "movie" ? "movie" : "tv"}/details/${d.id}`
            }
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-xl border border-gray-700/30 hover:border-amber-400/20 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {/* Image Container */}
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={
                  d.poster_path || d.backdrop_path || d.profile_path
                    ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}`
                    : noimg
                }
                alt={d.title || d.name}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
              
              {/* Rating Badge */}
              {d.vote_average && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 bg-amber-400/90 backdrop-blur-sm rounded-full text-black font-bold text-sm">
                  <RiStarFill className="text-amber-700" />
                  {d.vote_average.toFixed(1)}
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="p-4 space-y-3">
              <h1 className="text-lg font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {d.title || d.original_title || d.name || d.original_name}
              </h1>
              
              {/* Metadata Row */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                {d.media_type && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 rounded-full">
                    <RiMovie2Fill className="text-amber-400" />
                    {d.media_type.toUpperCase()}
                  </span>
                )}
                {d.release_date && (
                  <span>{new Date(d.release_date).getFullYear()}</span>
                )}
              </div>

              {/* Overview */}
              <p className="text-sm text-gray-300 line-clamp-3 group-hover:text-amber-100 transition-colors">
                {d.overview}
                <span className="ml-2 inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors">
                  more
                  <RiFireFill className="ml-1 text-xs opacity-0 group-hover:opacity-100 transition-all" />
                </span>
              </p>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        ))
      ) : (
        <div className="col-span-full py-12 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
            No Content Available
          </h1>
          <p className="text-gray-400 mt-2">Try searching for something else</p>
        </div>
      )}
    </div>
  );
}

export default HorizontalCards;