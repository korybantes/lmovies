import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Loading from "./Loading";
import { Sidenav } from "./templates/Sidenav";
import { Topnav } from "./templates/Topnav";
import noimg from "../../public/noimg.jpg";
import { RiCloseLine, RiStarFill, RiCalendarEventFill } from "react-icons/ri";

const TvSeason = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const series_id = pathname.split("/")[3];
  const [details, setDetails] = useState(null);

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`/tv/${series_id}/season/${id}`);
      setDetails(data);
    } catch (error) {
      console.error("Error fetching season details:", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (!details) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.poster_path})`,
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10 px-4 sm:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="lg:w-1/4 flex justify-center">
            <img
              className="w-64 h-96 object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
              src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
              alt={details.name}
              loading="lazy"
            />
          </div>
          
          <div className="lg:w-3/4 space-y-6 text-gray-100">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold">
                {details.name}
                <span className="ml-3 text-2xl font-semibold text-amber-400">
                  ({new Date(details.air_date).getFullYear()})
                </span>
              </h1>
              <Link
                to={`/tv/details/${series_id}`}
                className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
              >
                <RiCloseLine className="text-2xl text-amber-400" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full">
                <RiStarFill className="text-amber-400" />
                <span className="font-semibold">{details.vote_average.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full">
                <RiCalendarEventFill className="text-amber-400" />
                <span>{details.air_date}</span>
              </div>

              <div className="px-4 py-2 bg-gray-800/50 rounded-full">
                {details.episodes.length} Episodes
              </div>
            </div>

            <Section title="Season Overview">
              <p className="text-gray-300 leading-relaxed">{details.overview || "No overview available"}</p>
            </Section>
          </div>
        </div>

        {/* Episodes Grid */}
        <Section title="Episodes" className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {details.episodes.map((episode, index) => (
              <Link
                key={episode.id}
                to={`${pathname}/episode/${episode.episode_number}`}
                className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/30 hover:border-amber-400/20 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
              >
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={episode.still_path 
                      ? `https://image.tmdb.org/t/p/original/${episode.still_path}`
                      : noimg}
                    alt={episode.name}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {episode.episode_number}. {episode.name}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {episode.overview || "No description available"}
                  </p>
                  {episode.runtime && (
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                      <span className="bg-gray-700/50 px-2 py-1 rounded-full">
                        {episode.runtime}min
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-amber-400">
          <DnsLink />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children, className }) => (
  <div className={className}>
    <h2 className="text-2xl font-bold mb-4 text-amber-400">{title}</h2>
    {children}
  </div>
);

const DnsLink = () => (
  <p>
    Note: Connect{" "}
    <a
      href="https://1.1.1.1/"
      target="_blank"
      rel="noopener"
      className="text-blue-400 hover:text-blue-300 underline"
    >
      DNS
    </a>{" "}
    if links not working
  </p>
);

export default TvSeason;