import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "./store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";
import { Dropdown } from "./templates/Dropdown";

export const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [Category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation Bar */}
      <nav className="w-full h-[10vh] text-white flex items-center px-6 fixed top-0 left-0 z-50 bg-black/90 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="text-3xl hover:text-[#e5e5e5] duration-200"
        >
          <i className="ri-arrow-left-line"></i>
        </button>
        <Link to="/" className="ml-4 hover:text-[#e5e5e5] duration-200">
          <i className="ri-home-4-line text-2xl"></i>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="pt-[10vh] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0">
              <img
                className="w-full rounded-xl shadow-2xl"
                src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
                alt={info.detail.name}
              />
              <div className="flex justify-center gap-4 mt-6">
                {/* Social Links */}
                {info.externalid.wikidata_id && (
                  <Link
                    target="_blank"
                    to={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                    className="hover:text-[#e5e5e5] text-2xl"
                  >
                    <i className="ri-earth-fill"></i>
                  </Link>
                )}
                {info.externalid.facebook_id && (
                  <Link
                    target="_blank"
                    to={`https://www.facebook.com/${info.externalid.facebook_id}`}
                    className="hover:text-[#e5e5e5] text-2xl"
                  >
                    <i className="ri-facebook-circle-fill"></i>
                  </Link>
                )}
                {info.externalid.instagram_id && (
                  <Link
                    target="_blank"
                    to={`https://www.instagram.com/${info.externalid.instagram_id}`}
                    className="hover:text-[#e5e5e5] text-2xl"
                  >
                    <i className="ri-instagram-fill"></i>
                  </Link>
                )}
                {info.externalid.twitter_id && (
                  <Link
                    target="_blank"
                    to={`https://twitter.com/${info.externalid.twitter_id}`}
                    className="hover:text-[#e5e5e5] text-2xl"
                  >
                    <i className="ri-twitter-x-fill"></i>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-8">
              {/* Biography Section */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                  {info.detail.name}
                </h1>
                {info.detail.biography && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Biography</h2>
                    <p className="text-gray-300 leading-relaxed">
                      {info.detail.biography}
                    </p>
                  </div>
                )}
              </div>

              {/* Known For Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Known For</h2>
                <HorizontalCards data={info.combinedCredits.cast} />
              </div>

              {/* Credits Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Acting Credits</h2>
                  <Dropdown
                    title="Filter By"
                    options={["movie", "tv"]}
                    func={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  {info[Category + "Credits"].cast.map((c, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/70 transition-all duration-300"
                    >
                      <Link
                        to={`/${Category}/details/${c.id}`}
                        className="block"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">
                              {c.original_title || c.name || c.title || c.original_name}
                            </h3>
                            {c.character && (
                              <p className="text-sm text-gray-400 mt-1">
                                as {c.character}
                              </p>
                            )}
                          </div>
                          {c.release_date && (
                            <span className="text-sm text-gray-400">
                              {new Date(c.release_date).getFullYear()}
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};