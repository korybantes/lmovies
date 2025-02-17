import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "./store/actions/tvActions";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Sidenav } from "./templates/Sidenav";
import { Topnav } from "./templates/Topnav";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";
import { 
  RiArrowLeftLine, 
  RiExternalLinkFill, 
  RiEarthFill, 
  RiHome4Line,
  RiPlayFill,
  RiGithubFill,
  RiTvFill
} from "react-icons/ri";

const TvDetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => dispatch(removetv());
  }, [id]);

  if (!info) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10 px-4 sm:px-8 py-6">
        {/* Navigation */}
        <nav className="flex items-center gap-4 mb-8 text-gray-300">
          <Link
            to="/tv"
            className="p-2 hover:bg-gray-800/50 rounded-full transition-all duration-300"
          >
            <RiArrowLeftLine className="text-2xl" />
          </Link>
          <div className="flex items-center gap-4">
            <LinkNav icon={<RiExternalLinkFill />} to={info.detail.homepage} />
            <LinkNav 
              icon={<RiEarthFill />} 
              to={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} 
            />
            <LinkNav 
              text="IMDB" 
              to={`https://www.imdb.com/title/${info.externalid.imdb_id}/`} 
            />
            <LinkNav icon={<RiHome4Line />} to="/" />
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Poster Section */}
          <div className="lg:w-1/3 flex justify-center">
            <img
              className="w-64 h-96 object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
              src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path}`}
              alt={info.detail.name}
              loading="lazy"
            />
          </div>

          {/* Details Section */}
          <div className="lg:w-2/3 space-y-6 text-gray-100">
            <h1 className="text-4xl font-bold">
              {info.detail.name || info.detail.original_name}
              <span className="ml-3 text-2xl font-semibold text-amber-400">
                ({info.detail.first_air_date?.split("-")[0]})
              </span>
            </h1>

            {/* Metadata Row */}
            <div className="flex flex-wrap gap-4 items-center">
              <ScoreBadge score={(info.detail.vote_average * 10).toFixed()} />
              <DetailItem label="First Air Date" value={info.detail.first_air_date} />
              <DetailItem 
                label="Genres" 
                value={info.detail.genres?.map(g => g.name).join(", ")} 
              />
              {info.detail.episode_run_time?.[0] && 
                <DetailItem label="Episode Runtime" value={`${info.detail.episode_run_time[0]}min`} />}
            </div>

            {info.detail.tagline && (
              <p className="text-xl italic text-amber-300">{info.detail.tagline}</p>
            )}

            <Section title="Overview">
              <p className="text-gray-300 leading-relaxed">{info.detail.overview}</p>
            </Section>

            <Section title="Translations">
              <p className="text-gray-400">{info.translations.join(", ")}</p>
            </Section>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <TrailerButton path={pathname} />
              <PlayButton path={pathname} label="Link 1" />
            </div>

            <p className="text-sm text-amber-400">
              Note: Connect <DnsLink /> if links not working
            </p>
          </div>
        </div>

        {/* Watch Providers */}
        <ProviderSection 
          title="Available On Platforms"
          providers={info.watchproviders?.flatrate} 
        />
        <ProviderSection 
          title="Available On Rent"
          providers={info.watchproviders?.rent} 
        />
        <ProviderSection 
          title="Available To Buy"
          providers={info.watchproviders?.buy} 
        />

        {/* Seasons */}
        <Section title="Seasons" className="mt-12">
          <HorizontalCards 
            data={info.detail.seasons} 
            customLink={(season) => `${pathname}/season/${season.season_number}`}
          />
        </Section>

        {/* Recommendations */}
        <Section title="Recommendations & Similar" className="mt-12">
          <HorizontalCards 
            data={info.recommendations.length > 0 ? info.recommendations : info.similar} 
          />
          <Outlet />
        </Section>

        {/* Footer */}
        <div className="mt-12 flex items-center gap-4 text-gray-400">
          <p>MADE WITH ❤️ BY HARSH PATEL</p>
          <a
            href="https://www.instagram.com/patelharsh.in/"
            target="_blank"
            rel="noopener"
            className="hover:text-amber-400 transition-colors"
          >
            <RiGithubFill className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Reusable Components (Same as MovieDetails)
const LinkNav = ({ icon, text, to }) => (
  <Link
    to={to}
    target="_blank"
    className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
  >
    {icon}
    {text && <span className="text-sm">{text}</span>}
  </Link>
);

const ScoreBadge = ({ score }) => (
  <div className="flex items-center gap-2">
    <div className="w-12 h-12 bg-amber-500/90 flex items-center justify-center rounded-full">
      <span className="font-bold">{score}%</span>
    </div>
    <span className="text-sm font-semibold">User Score</span>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
    <span className="text-sm text-amber-400">{label}</span>
    <p className="font-medium">{value}</p>
  </div>
);

const Section = ({ title, children, className }) => (
  <div className={className}>
    <h2 className="text-2xl font-bold mb-4 text-amber-400">{title}</h2>
    {children}
  </div>
);

const TrailerButton = ({ path }) => (
  <Link
    to={`${path}/trailer`}
    className="flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full transition-all duration-300"
  >
    <RiPlayFill className="mr-2" />
    Play Trailer
  </Link>
);

const PlayButton = ({ path, label }) => (
  <Link
    to={`${path}/player`}
    className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-amber-400 font-semibold rounded-full transition-all duration-300"
  >
    <RiPlayFill className="mr-2" />
    Play <sub className="ml-1 text-xs">{label}</sub>
  </Link>
);

const DnsLink = () => (
  <a
    href="https://1.1.1.1/"
    target="_blank"
    rel="noopener"
    className="text-blue-400 hover:text-blue-300 underline"
  >
    DNS
  </a>
);

const ProviderSection = ({ title, providers }) => (
  providers?.length > 0 && (
    <Section title={title} className="my-8">
      <div className="flex flex-wrap gap-4">
        {providers.map((provider, i) => (
          <img
            key={i}
            src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
            alt={provider.provider_name}
            className="h-12 object-contain hover:scale-110 transition-transform duration-300"
            title={provider.provider_name}
          />
        ))}
      </div>
    </Section>
  )
);

export default TvDetails;