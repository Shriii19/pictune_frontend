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
                className="relative text-center animate-scale-bounce"
                style={{ animationDelay: `${0.2 + idx * 0.12}s` }}
              >
                <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col items-center justify-center mb-3 hover:border-indigo-500/30 hover:bg-white/[0.06] transition-all duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: item.color }}>{item.step}</span>
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
