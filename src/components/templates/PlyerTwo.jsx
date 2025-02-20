import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const PlyerTwo = () => {
  const Navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.detail.id);

  return ytvideo ? (
    <div className="absolute top-0 left-0 bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900 text-white w-full h-screen flex items-center justify-center">
      <Link
        to={`/${category === "movie" ? "movie" : "tv"}/details/${ytvideo}`}
        className="hover:text-[#ffffdd] hover:bg-amber-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-close-fill absolute top-5 right-16"
      >
        <span className="ri-close-line"></span>
      </Link>
      <iframe
        allowFullScreen
        className="w-[90vw] sm:h-[80vh] h-[80vh] rounded-lg border-4 border-gray-800 shadow-lg"
        src={`https://embed.smashystream.com/playere.php?tmdb=${ytvideo}`}
      ></iframe>
    </div>
  ) : (
    <Notfound />
  );
};

export default PlyerTwo;
