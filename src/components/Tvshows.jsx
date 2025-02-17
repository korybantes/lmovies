import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Topnav } from "./templates/Topnav";
import { Cards } from "./templates/Cards";
import { Dropdown } from "./templates/Dropdown";
import { RiArrowLeftLine, RiTvLine, RiLoader4Line } from "react-icons/ri";

export const Tvshows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  document.title = `lmovies | TV Shows ${category.toUpperCase()}`;

  const GetTv = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      console.log("API Response:", data); // Debugging line

      if (data.results && Array.isArray(data.results)) {
        setTv((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
        setHasMore(data.results.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching TV shows:", error);
      setError("Failed to load TV shows. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTv([]);
    setError(null);
    GetTv();
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
              TV SHOWS
              <span className="block text-sm text-center text-gray-400">
                {category.replace(/_/g, " ")}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "on_the_air", "airing_today"]}
              func={(e) => setCategory(e.target.value)}
              className="bg-gray-800/50 backdrop-blur-sm"
            />
            <Topnav />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading && tv.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <RiLoader4Line className="animate-spin text-4xl text-amber-400" />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={tv.length}
          next={GetTv}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-8">
              <RiLoader4Line className="animate-spin text-4xl text-amber-400" />
            </div>
          }
          className="px-6 py-8"
        >
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
      )}
    </div>
  );
};