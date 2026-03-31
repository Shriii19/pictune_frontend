import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      
      {/* Hero */}
      <div className="relative z-10 text-center max-w-3xl animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-medium mb-8 animate-fade-in glow-border-animated">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          AI-Powered Music Discovery
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Find the perfect{" "}
          <span className="gradient-text-animated bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">soundtrack</span>
          <br />
          for every photo
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Upload any photo and let our AI detect its mood — happy, sad, calm,
          energetic — then get curated song recommendations that match the
          vibe. Your moments deserve music.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/dashboard"
            className="group gradient-btn px-8 py-4 rounded-xl text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105 animate-neon-pulse relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2.5">
              <svg className="group-hover:translate-x-0.5 transition-transform duration-200" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Try Now — It&apos;s Free
            </span>
          </Link>
          <Link
            to="/about"
            className="group px-6 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-white/8 hover:border-indigo-400/40 hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Learn how it works
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* How it works — compact */}
      <div className="w-full max-w-4xl animate-slide-up" style={{ animationDelay: "0.15s" }}>
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <h2 className="text-center text-lg font-bold text-white mb-8">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-pink-500/30" />

            {[
              {
                step: "01",
                color: "#818cf8",
                title: "Upload a Photo",
                desc: "Any image — a selfie, landscape, or a moment you want to soundtrack.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                ),
              },
              {
                step: "02",
                color: "#a78bfa",
                title: "AI Reads the Mood",
                desc: "Our model analyzes emotion, colors and context to detect the vibe.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                ),
              },
              {
                step: "03",
                color: "#c084fc",
                title: "Get Your Songs",
                desc: "Receive curated song picks that match the mood — hit play instantly.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative text-center animate-scale-bounce group cursor-default"
                style={{ animationDelay: `${0.2 + idx * 0.12}s` }}
              >
                <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col items-center justify-center mb-3 hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-0.5 transition-colors duration-300" style={{ color: item.color }}>{item.step}</span>
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors duration-300">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto group-hover:text-slate-400 transition-colors duration-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-4xl mt-16 animate-slide-up" style={{ animationDelay: "0.25s" }}>
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Photos Analyzed", icon: "📸" },
              { value: "99.2%", label: "Accuracy Rate", icon: "🎯" },
              { value: "15K+", label: "Happy Users", icon: "⚡" },
              { value: "100K+", label: "Songs Matched", icon: "🎵" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center group cursor-default animate-scale-bounce"
                style={{ animationDelay: `${0.3 + idx * 0.08}s` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-5xl mt-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-center text-2xl font-bold text-white mb-12">
          Why Choose <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Pictune</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Lightning Fast",
              desc: "Get song recommendations in seconds with our optimized AI engine",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
              color: "from-yellow-400 to-orange-500",
              bgGlow: "group-hover:shadow-yellow-500/20"
            },
            {
              title: "Smart AI",
              desc: "Advanced mood detection analyzing colors, objects, and context",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              ),
              color: "from-purple-400 to-pink-500",
              bgGlow: "group-hover:shadow-purple-500/20"
            },
            {
              title: "Curated Picks",
              desc: "Handpicked playlists and songs from premium music sources",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
              ),
              color: "from-green-400 to-emerald-500",
              bgGlow: "group-hover:shadow-green-500/20"
            },
            {
              title: "Save History",
              desc: "Access your past searches and rediscover perfect matches anytime",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              color: "from-blue-400 to-cyan-500",
              bgGlow: "group-hover:shadow-blue-500/20"
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`group glass-card rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${feature.bgGlow} animate-scale-bounce`}
              style={{ animationDelay: `${0.35 + idx * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
