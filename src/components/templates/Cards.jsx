import React from "react";
import { Link } from "react-router-dom";
import noimg from "/noimg.jpg";
import { RiStarFill, RiPlayFill } from "react-icons/ri";

export const Cards = ({ data, title }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-gray-400 text-lg">No content available. Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-xl border border-gray-700/30 hover:border-amber-400/20 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          {/* Image Container */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`
                  : noimg
              }
              alt={c.title || c.original_title || c.name || c.original_name}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
            
            {/* Rating Badge */}
            {c.vote_average && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 bg-amber-400/90 backdrop-blur-sm rounded-full text-black font-bold text-sm">
                <RiStarFill className="text-amber-700" />
                {c.vote_average.toFixed(1)}
              </div>
            )}
          </div>

          {/* Content Container */}
          <div className="p-4 space-y-3">
            <h1 className="text-lg font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              {c.title || c.original_title || c.name || c.original_name}
            </h1>
            
            {/* Metadata Row */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              {c.release_date && <span>{new Date(c.release_date).getFullYear()}</span>}
              {c.media_type && <span className="capitalize">{c.media_type}</span>}
            </div>
            
            {/* Overview */}
            <p className="text-sm text-gray-300 line-clamp-3 group-hover:text-amber-100 transition-colors">
              {c.overview}
              <span className="ml-2 inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors">
                more
                <RiPlayFill className="ml-1 text-xs opacity-0 group-hover:opacity-100 transition-all" />
              </span>
            </p>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      ))}
    </div>
  );
};
