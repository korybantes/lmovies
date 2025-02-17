export const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-[#0f0f0f] to-gray-900 backdrop-blur-xl">
      {/* Animated Logo */}
      <div className="relative group mb-8">
        <h1 className="text-5xl sm:text-6xl font-bold animate-text-shine bg-[linear-gradient(110deg,#eab308,45%,#f59e0b,55%,#eab308)] bg-[length:250%_100%] bg-clip-text text-transparent">
          l-movies
        </h1>
        <div className="absolute inset-0 bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all duration-500 rounded-full" />
      </div>

      {/* Loading Content */}
      <div className="glass-container p-8 rounded-2xl backdrop-blur-xl border border-amber-500/20">
        {/* Dynamic Text */}
        <p className="text-lg font-medium text-amber-300 mb-6 animate-pulse-slow">
          Curating Cinematic Experience
        </p>

        {/* Modern Progress Indicator */}
        <div className="relative w-64 h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent animate-laser-beam"></div>
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 -z-10">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-amber-400/80 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;