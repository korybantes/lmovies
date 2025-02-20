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

export const Trending = () => {
  document.title = "l-movies | Trending";

  const [category, setCategory] = useState("movie");
  const [year, setYear] = useState(new Date().getFullYear());
  const [genre, setGenre] = useState("");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [menuset, setMenuset] = useState(false);
  const [wallpaper, setWallpaper] = useState(null);
  const [genres, setGenres] = useState([]);

  // ✅ Made by Korybantes - Fetch genres
  const GetGenres = async () => {
    try {
      const { data } = await axios.get(`/genre/${category}/list`);
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // ✅ Made by Korybantes - Fetch trending with infinite scrolling
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/discover/${category}?year=${year}&with_genres=${genre}&page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  // ✅ Made by Korybantes - Fetch wallpaper
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
    if (!wallpaper) {
      GetHeaderWallpaper();
    }
  }, [wallpaper]);

  useEffect(() => {
    GetGenres();
  }, [category]);

  return (
    <div className="flex">
      {/* ✅ Sidenav should always be visible when menuset is true */}
      <Sidenav menuset={menuset} menuhendlaer={() => setMenuset(!menuset)} />
      <div className="w-[80%] sm:w-full min-h-full overflow-auto overflow-x-hidden">
        <Topnav menuhendlaer={() => setMenuset(!menuset)} menuset={menuset} />
        <Header data={wallpaper} />
        
        <div className="flex justify-between items-center p-3">
          <h1 className="text-2xl font-semibold text-zinc-300">Trending</h1>
          <div className="flex gap-5">
            <Dropdown
              title="Year"
              options={Array.from(
                { length: 50 },
                (_, i) => new Date().getFullYear() - i
              )}
              func={(e) => setYear(e.target.value)}
            />
            <Dropdown
              title="Category"
              options={["movie", "tv"]}
              func={(e) => setCategory(e.target.value)}
            />
            <Dropdown
              title="Genre"
              options={genres.map((g) => ({ label: g.name, value: g.id }))}
              func={(e) => setGenre(e.target.value)}
            />
          </div>
        </div>
        
        {/* ✅ Scrollable Div for Infinite Scroll */}
        <div
          id="scrollableDiv"
          style={{ height: "80vh", overflowY: "auto", display: "flex", flexDirection: "column" }}
        >
          <InfiniteScroll
            dataLength={trending.length}
            next={GetTrending}
            hasMore={hasMore}
            loader={<h1 className="text-center text-zinc-300">Loading...</h1>}
            scrollableTarget="scrollableDiv"
          >
            <HorizontalCards data={trending} />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};
