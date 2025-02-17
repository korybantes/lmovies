import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import noimg from "/noimg.jpg";
import { RiCloseLine, RiMenuFill, RiSearchLine, RiLoader4Line } from "react-icons/ri";

export const Topnav = ({ menuhendlaer, menuset }) => {
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getSearches = async () => {
    try {
      setIsSearching(true);
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearchResults(data.results);
    } catch (error) {
      console.error("Search error", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (query.trim()) {
        getSearches();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [query]);

  return (
    <nav className="sticky top-0 z-[90] bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 sm:px-8">
        {/* Dynamic Menu Button with Hover Animation */}
        <button
          onClick={menuhendlaer}
          className={`${
            pathname === "/" ? "block" : "hidden"
          } group p-2 hover:bg-gray-700/30 rounded-xl transition-all duration-300`}
        >
          {menuset ? (
            <RiCloseLine className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
          ) : (
            <RiMenuFill className="w-8 h-8 text-amber-400 group-hover:rotate-90 transition-transform" />
          )}
        </button>

        {/* Enhanced Search Container */}
        <div className="relative flex-1 max-w-2xl ml-4">
          <div className="relative group">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg bg-gray-800/50 backdrop-blur-sm border-2 border-transparent rounded-2xl outline-none 
                        focus:border-amber-400/30 focus:bg-gray-900/80 transition-all duration-500
                        placeholder:text-gray-400 text-gray-100 shadow-xl"
              placeholder="Explore cinematic universe..."
              type="search"
            />
            <RiSearchLine className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-amber-400/80" />
            
            {/* Animated Loading Indicator */}
            {isSearching && (
              <RiLoader4Line className="absolute right-14 top-1/2 -translate-y-1/2 w-6 h-6 text-amber-400 animate-spin-slow" />
            )}
          </div>

          {/* Glassmorphic Search Results Dropdown */}
          {query && (
            <div className="absolute mt-4 w-full bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden 
              animate-fade-in transition-all duration-300 origin-top">
              {searchResults.length > 0 ? (
                searchResults.map((result, i) => (
                  <Link
                    key={`${result.id}-${i}`}
                    to={`/${result.media_type}/details/${result.id}`}
                    className="flex items-center p-4 hover:bg-gray-800/50 transition-all duration-300 group"
                  >
                    {/* Image with Shimmer Effect */}
                    <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                      <img
                        src={
                          result.poster_path || result.backdrop_path || result.profile_path
                            ? `https://image.tmdb.org/t/p/original/${
                                result.poster_path || result.backdrop_path || result.profile_path
                              }`
                            : noimg
                        }
                        alt={result.title || result.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />
                    </div>

                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-amber-100 truncate">
                        {result.title || result.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="px-2 py-1 text-xs font-medium bg-amber-400/20 text-amber-300 rounded-full">
                          {result.media_type.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-400">
                          {result.release_date || 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-gray-400">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};