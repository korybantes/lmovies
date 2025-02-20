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
      if (query.trim()) getSearches();
      else setSearchResults([]);
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [query]);

  return (
    <nav className="fixed w-full top-0 z-[90] bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={menuhendlaer} className="text-2xl text-amber-400 hover:text-amber-300 transition-colors">
            {menuset ? <RiCloseLine /> : <RiMenuFill />}
          </button>
          <Link to="/" className="text-2xl font-bold text-amber-400">l-movies</Link>
        </div>

        <div className="relative flex-1 max-w-xl mx-4">
          <div className="relative group">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 py-3 text-sm bg-gray-800/50 backdrop-blur-sm border-2 border-transparent rounded-full outline-none focus:border-amber-400/30 focus:bg-gray-900/80 transition-all duration-500 placeholder:text-gray-400 text-gray-100"
              placeholder="Search..."
              type="search"
            />
            <RiSearchLine className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/80" />
            {isSearching && <RiLoader4Line className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 animate-spin-slow" />}
          </div>

          {query && (
            <div className="absolute mt-2 w-full bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden animate-fade-in">
              {searchResults.length > 0 ? searchResults.map((result, i) => (
                <Link
                  key={`${result.id}-${i}`}
                  to={`/${result.media_type}/details/${result.id}`}
                  className="flex items-center p-3 hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src={result.poster_path || result.backdrop_path || result.profile_path ? `https://image.tmdb.org/t/p/original/${result.poster_path || result.backdrop_path || result.profile_path}` : noimg}
                      alt={result.title || result.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-amber-100 truncate">{result.title || result.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-1.5 py-0.5 bg-amber-400/20 text-amber-300 rounded-full">{result.media_type.toUpperCase()}</span>
                      <span className="text-xs text-gray-400">{result.release_date || 'Coming Soon'}</span>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="p-4 text-center text-gray-400 text-sm">No results found for "{query}"</div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/movie" className="text-amber-400 hover:text-amber-300 text-sm">Movies</Link>
          <Link to="/tv" className="text-amber-400 hover:text-amber-300 text-sm">TV Shows</Link>
        </div>
      </div>
    </nav>
  );
};
