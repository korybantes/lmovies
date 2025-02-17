import React from "react";
import { Link } from "react-router-dom";
import noimg from "/noimg.jpg";
import { RiStarFill, RiPlayFill } from "react-icons/ri";

export const Cards = ({ data, title }) => {
  // Ensure data is an array
  if (!Array.isArray(data)) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-gray-400 text-lg">
          No data available. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 sm:p-6">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-xl border border-gray-700/30 hover:border-amber-400/20 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
          key={c.id + i}
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          {/* Image Container */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimg
              }
              alt={c.title || c.original_title || c.name || c.original_name}
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
            
            {/* Rating Badge */}
            {c.vote_average > 0 && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-amber-400/90 backdrop-blur-sm rounded-full text-black font-bold text-sm">
                <RiStarFill className="text-amber-700" />
                {(c.vote_average * 10).toFixed()}%
              </div>
            )}
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-lg font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              {c.title || c.original_title || c.name || c.original_name}
            </h1>
            
            {/* Metadata */}
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
              {c.release_date && (
                <span>{new Date(c.release_date).getFullYear()}</span>
              )}
              {c.media_type && (
                <span className="capitalize">{c.media_type}</span>
              )}
            </div>

            {/* Hover Button */}
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full transition-all duration-300">
                <RiPlayFill className="text-xl" />
                Details
              </button>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      ))}
    </div>
  );
};