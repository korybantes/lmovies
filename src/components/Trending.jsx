import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidenav } from "./templates/Sidenav";
import { Topnav } from "./templates/Topnav";
import axios from "../utils/axios";
import { Header } from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./Loading";
import { Dropdown } from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import { RiLoader4Line } from "react-icons/ri";
import { RiArrowLeftLine } from "react-icons/ri";

export const Trending = () => {
  document.title = "l-movies | Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [year, setYear] = useState(new Date().getFullYear());
  const [genre, setGenre] = useState("");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [menuset, setMenuset] = useState(false);
  const [wallpaper, setWallpaper] = useState(null);
  const [genres, setGenres] = useState([]);

  const GetGenres = async () => {
    try {
      const { data } = await axios.get(`/genre/${category}/list`);
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/discover/${category}?year=${year}&with_genres=${genre}&page=${page}`
      );
      data.results?.length ? 
        setTrending(prev => [...prev, ...data.results]) : 
        setHasMore(false);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomData = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
    }
  };

  useEffect(() => {
    setTrending([]);
    setPage(1);
    setHasMore(true);
    GetTrending();
  }, [category, year, genre]);

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
  }, [wallpaper]);

  useEffect(() => {
    GetGenres();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Fixed Header */}
      <div className="fixed w-full top-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800">
        <div className="px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
            >
              <RiArrowLeftLine className="text-2xl text-amber-400" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              TV Shows
            </h1>
          </div>
          
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "on_the_air", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
            className="bg-gray-800/50 text-amber-400"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-20 pb-12">
        <InfiniteScroll
          dataLength={tv.length}
          next={GetTv}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-8">
              <RiLoader4Line className="animate-spin text-4xl text-amber-400" />
            </div>
          }
          className="px-4 sm:px-8"
        >
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
      </div>
    </div>
  );
};

// Made by Korybantes/ github.com/korybantes