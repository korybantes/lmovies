import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const Navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return ytvideo ? (
    <div className="absolute top-0 left-0 bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900 text-white w-full h-screen flex items-center justify-center">
      <Link
        onClick={() => Navigate(-1)}
        className="hover:text-[#ffffdd] hover:bg-amber-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-close-fill absolute top-5 right-16"
      >
        <span className="ri-close-line"></span>
      </Link>
      <ReactPlayer
        width={1000}
        height={500}
        controls
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        className="rounded-lg border-4 border-gray-800 shadow-lg"
      />
    </div>
  ) : (
    <Notfound />
  );
};

export default Trailer;
