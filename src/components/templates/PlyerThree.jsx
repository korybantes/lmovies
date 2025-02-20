import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Notfound from "../Notfound";

const PlyerThree = () => {
  const Navigate = useNavigate();
  const { pathname } = useLocation();
  var series = pathname.split("/")[3];
  var season = pathname.split("/")[5];
  var episode = pathname.split("/")[7];

  return (
    <div className="absolute top-0 left-0 bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900 text-white w-full h-screen flex items-center justify-center">
      <Link
        to={`/tv/details/${series}/season/${season}`}
        className="hover:text-[#ffffdd] hover:bg-amber-500 text-3xl font-semibold mr-2 rounded-full mt-1 duration-300 cursor-pointer text-zinc-400 ri-close-fill absolute top-5 right-16"
      >
        <span className="ri-close-line"></span>
      </Link>

      <iframe
        allowFullScreen
        className="w-[90vw] sm:h-[80vh] h-[80vh] rounded-lg border-4 border-gray-800 shadow-lg"
        src={`https://embed.smashystream.com/playere.php?tmdb=${series}&season=${season}&episode=${episode}`}
      ></iframe>
    </div>
  );
};

export default PlyerThree;
