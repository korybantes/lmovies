import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { RiLoader4Line } from "react-icons/ri";
import { Cards } from "./templates/Cards";
import { Dropdown } from "./templates/Dropdown";
import { Topnav } from "./templates/Topnav";
import { RiArrowLeftLine } from "react-icons/ri";

export const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const GetMovie = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      console.log("API Response:", data); // Debugging line

      if (data.results && Array.isArray(data.results)) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
        setHasMore(data.results.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setMovie([]);
    setError(null);
    GetMovie();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900 flex items-center justify-center">
        <div className="text-center p-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/30">
          <h1 className="text-2xl font-bold text-amber-400 mb-4">Oops!</h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={refreshHandler}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-800/50 rounded-full transition-all duration-300"
          >
            <RiArrowLeftLine className="text-2xl text-amber-400" />
          </button>

          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              MOVIES
              <span className="block text-sm text-center text-gray-400">
                {category.replace(/_/g, " ")}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Dropdown
              title="Category"
              options={["now_playing", "popular", "top_rated", "upcoming"]}
              func={(e) => setCategory(e.target.value)}
              className="bg-gray-800/50 backdrop-blur-sm"
            />
            <Topnav />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading && movie.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <RiLoader4Line className="animate-spin text-4xl text-amber-400" />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={movie.length}
          next={GetMovie}
          hasMore={hasMore}
          loader={<div className="flex justify-center py-8"><RiLoader4Line className="animate-spin text-4xl text-amber-400" /></div>}
          scrollThreshold={0.95} // optional, triggers early
          className="px-6 py-8"
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      )}
    </div>
  );
};
