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
      const randomData = data.results[Math.floor(Math.random() * data.results.length)];
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
  }, [category]);

  useEffect(() => {
    if (!wallpaper) {
      GetHeaderWallpaper();
    }
  }, [wallpaper]);

  return wallpaper && trending ? (
    <>
      <Sidenav menuset={menuset} menuhendlaer={menuhandler} />
      <div className="w-full min-h-screen bg-gray-900">
        <Topnav menuhendlaer={menuhandler} menuset={menuset} />
        <Header data={wallpaper} />
        
        {/* Changed section background */}
        <section className="relative z-10 px-4 sm:px-8 pb-12 bg-gray-900">
          <div className="max-w-full mx-auto bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-t-3xl pt-20 shadow-2xl">
            
            {/* Content container */}
            <div className="px-4 sm:px-6">
              <div className="flex items-center justify-between mb-8 pt-12">
                <h2 className="text-2xl font-bold text-zinc-300">Trending Now</h2>
                <Dropdown
                  title="Filter"
                  options={["tv", "movie", "all"]}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>
              
              <HorizontalCards data={trending} />
              
              <div className="border-t border-gray-800/50 mt-12 pt-12">
                <h2 className="text-2xl font-bold text-zinc-300 mb-8">Popular on L-Movies</h2>
                <HorizontalCards data={trending} />
              </div>

              <div className="border-t border-gray-800/50 mt-12 pt-12">
                <h2 className="text-2xl font-bold text-zinc-300 mb-8">New Releases</h2>
                <HorizontalCards data={trending} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  ) : (
    <Loading />
  );
};