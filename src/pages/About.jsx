import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center px-4 sm:px-6 py-10 md:py-14">
      {/* Page Header */}
      <div className="text-center mb-12 animate-slide-up max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/8 border border-violet-500/20 text-violet-300 text-xs font-medium mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          About PicTune
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Our <span className="gradient-text">Mission</span>
        </h1>
      </div>

      {/* ── Mission Statement ────────────────────────────────── */}
      <section className="w-full max-w-4xl mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4 animate-slide-in-left">
            Bridging <span className="gradient-text">Visuals &amp; Music</span> with AI
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            We built PicTune because we believe every moment has a soundtrack.
            A sunset, a crowded street, a quiet morning &mdash; each carries a mood
            that music can amplify. Our AI reads the emotion in your photos and
            finds songs that match, so you can <em className="text-slate-300">feel</em> what you see.
          </p>

          {/* Feature pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 stagger-children">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                ),
                title: "Mood Detection",
                desc: "Advanced AI analyzes the emotion, colors and context in any photo you upload.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                ),
                title: "Smart Matching",
                desc: "Our engine maps moods to curated tracks across genres and languages.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                ),
                title: "Your Soundtrack",
                desc: "Listen instantly and keep a history of every mood you've ever captured.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass rounded-xl p-5 text-center animate-scale-bounce"
                style={{ animationDelay: `${0.1 + idx * 0.12}s` }}
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/4 border border-white/8 mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="w-full max-w-4xl mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/8 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-5 animate-fade-in">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              How It Works
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white animate-slide-in-right">
              Three steps to your <span className="gradient-text">perfect playlist</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-pink-500/30" />

            {[
              {
                step: "01",
                color: "#818cf8",
                title: "Upload a Photo",
                desc: "Snap or pick any image — a selfie, landscape, or moment you want to soundtrack.",
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
                title: "AI Detects the Mood",
                desc: "Our model reads emotion, colors, objects and context to determine the vibe.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                ),
              },
              {
                step: "03",
                color: "#c084fc",
                title: "Get Your Songs",
                desc: "Receive curated song recommendations that match the mood — hit play instantly.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative text-center animate-scale-bounce"
                style={{ animationDelay: `${0.15 + idx * 0.15}s` }}
              >
                {/* Step circle */}
                <div className="relative z-10 mx-auto w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col items-center justify-center mb-4 group hover:border-indigo-500/30 hover:bg-white/[0.06] transition-all duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.step}</span>
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="w-full max-w-4xl mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="glass-card rounded-2xl p-8 md:p-10 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Ready to try it?</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Upload your first photo and let AI find the soundtrack to your moment.
          </p>
          <Link
            to="/dashboard"
            className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Go to Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
