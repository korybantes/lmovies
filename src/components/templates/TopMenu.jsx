import React from "react";
import { Link } from "react-router-dom";

export const TopMenu = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-900 shadow-lg py-3 px-5 z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">L-Movies</h1>
        <ul className="flex gap-5 text-white">
          <li>
            <Link to="/" className="hover:text-primary transition-all">Home</Link>
          </li>
          <li>
            <Link to="/trending" className="hover:text-primary transition-all">Trending</Link>
          </li>
          <li>
            <Link to="/popular" className="hover:text-primary transition-all">Popular</Link>
          </li>
          <li>
            <Link to="/top-rated" className="hover:text-primary transition-all">Top Rated</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
