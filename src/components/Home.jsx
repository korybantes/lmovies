import React, { useEffect, useState } from "react";
import { Sidenav } from "./templates/Sidenav";
import { Topnav } from "./templates/Topnav";
import axios from "../utils/axios";
import { Header } from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./Loading";
import { Dropdown } from "./templates/Dropdown";

export const Home = () => {
  document.title = "l-movies | Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [menuset, setMenuset] = useState(false);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const menuhandler = () => {
    setMenuset((prev) => !prev);
  };

  useEffect(() => {
    GetTrending();
  }, [category]); // Only runs when category changes

  useEffect(() => {
    if (!wallpaper) {
      GetHeaderWallpaper();
    }
  }, [wallpaper]); // Fetch wallpaper only once

  return wallpaper && trending ? (
    <>
      {/* Ensure menuhandler is passed to Sidenav */}
      <Sidenav menuset={menuset} menuhendlaer={menuhandler} />
      <div className="w-[80%] sm:w-full min-h-full overflow-auto overflow-x-hidden">
        <Topnav menuhendlaer={menuhandler} menuset={menuset} />
        <Header data={wallpaper} />

        <div className="flex justify-between items-center p-3">
          <h1 className="text-2xl font-semibold text-zinc-300">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};
