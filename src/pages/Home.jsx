import { Link } from "react-router-dom";
import { useEffect } from "react";

/* â”€â”€ Animated waveform bars â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function MusicBars({ className = "" }) {
  return (
    <span className={`music-bars ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

/* â”€â”€ Mock result card shown on the hero right side â”€â”€â”€â”€â”€â”€â”€â”€ */
function MockCard() {
  return (
    <div className="relative animate-float-slow">
      {/* Ambient glow */}
      <div className="absolute -inset-10 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative glass-card card-shine rounded-2xl overflow-hidden w-72 shadow-2xl shadow-violet-900/20 border border-white/10">
        {/* Photo placeholder â€” abstract gradient */}
        <div className="relative h-44 overflow-hidden select-none">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-violet-800 to-purple-950" />
          <div className="absolute inset-0 bg-linear-to-tr from-blue-600/30 via-transparent to-pink-500/25" />
          <div className="scan-line" />
          <div className="absolute inset-0 grid-lines opacity-30" />
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-xs font-medium text-white/70">
            ðŸ“¸ landscape.jpg
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/70 font-medium">Analyzingâ€¦</span>
          </div>
        </div>

        {/* Mood result */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold">Detected Mood</p>
              <p className="text-xl font-black text-violet-300 leading-tight">Melancholic</p>
            </div>
            <MusicBars className="text-violet-400" />
          </div>
          <div className="space-y-1.5">
            {[
              { title: "River", artist: "Leon Bridges" },
              { title: "The Night We Met", artist: "Lord Huron" },
            ].map((song, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white/4 rounded-lg px-3 py-2.5 border border-white/6 hover:border-violet-500/20 transition-colors duration-200"
              >
                <div className="w-6 h-6 rounded-md bg-violet-500/20 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="text-violet-400">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{song.title}</p>
                  <p className="text-[10px] text-slate-500 truncate">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Floating music note particles
  const symbols = ["â™ª", "â™«", "â™©", "â™¬", "ð„ž", "â™­"];
  const particles = Array.from({ length: 10 }, (_, i) => ({
    char: symbols[i % symbols.length],
    style: {
      left: `${(i * 11 + 5) % 94}%`,
      top: `${(i * 17 + 8) % 80}%`,
      fontSize: `${12 + (i % 4) * 4}px`,
      animationDelay: `${i * 0.6}s`,
      animationDuration: `${5 + (i % 3) * 2}s`,
    },
  }));

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Floating music note particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute select-none text-indigo-400/20 animate-particle-float font-bold"
            style={p.style}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" aria-hidden="true" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#050510] to-transparent pointer-events-none" aria-hidden="true" />

      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* Left â€” Headline & CTA */}
          <div className="animate-slide-up max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/25 text-indigo-300 text-xs font-medium mb-8 glow-border-animated">
              <MusicBars className="text-indigo-400" />
              AI-Powered Music Discovery
            </div>

            {/* Asymmetric headline */}
            <h1 className="font-black tracking-tighter leading-none mb-6">
              <span className="block text-5xl sm:text-6xl md:text-7xl text-white">Find the</span>
              <span className="block text-6xl sm:text-7xl md:text-[5.5rem] bg-linear-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent py-1 animate-gradient-x">perfect</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl text-slate-500 font-light">soundtrack.</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
              Upload any photo â€” our AI detects its{" "}
              <em className="text-slate-200 not-italic font-medium">emotional mood</em> and curates songs
              that perfectly match. Sad skies, golden sunsets, rainy mornings â€” every image has a soundtrack.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/dashboard"
                className="group gradient-btn px-7 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 transition-all duration-300 hover:scale-[1.03] animate-neon-pulse flex items-center justify-center gap-2.5"
              >
                <svg
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Try it Free
              </Link>
              <Link
                to="/about"
                className="group px-6 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-white/8 hover:border-white/20 bg-white/2 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                How it works
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Trust stats â€” horizontal inline */}
            <div className="flex items-center gap-6 border-t border-white/6 pt-7">
              {[
                { val: "50K+", label: "Photos analyzed" },
                { val: "100K+", label: "Songs matched" },
                { val: "15K+", label: "Happy users" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-extrabold text-white tracking-tight">{s.val}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 whitespace-nowrap">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right â€” Demo preview card */}
          <div className="hidden lg:flex justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <MockCard />
          </div>
        </div>
      </div>

      {/* â”€â”€ How it works â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="reveal">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-600 font-bold">The Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Three steps. Magic results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-[38px] left-[calc(33.33%+14px)] right-[calc(33.33%+14px)] h-px bg-linear-to-r from-indigo-500/30 via-violet-500/40 to-purple-500/30" aria-hidden="true" />

            {[
              {
                num: "01", title: "Upload", desc: "Drop any photo â€” a selfie, landscape, or any captured moment.",
                accent: "text-indigo-400", border: "border-indigo-500/15 hover:border-indigo-500/40",
                iconBg: "bg-indigo-500/10 border-indigo-500/15", shadow: "hover:shadow-indigo-500/10",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                ),
              },
              {
                num: "02", title: "Analyze", desc: "AI reads colors, emotion, and context to determine the exact vibe.",
                accent: "text-violet-400", border: "border-violet-500/15 hover:border-violet-500/40",
                iconBg: "bg-violet-500/10 border-violet-500/15", shadow: "hover:shadow-violet-500/10",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                ),
              },
              {
                num: "03", title: "Discover", desc: "Get curated songs that match your photo's mood â€” hit play instantly.",
                accent: "text-purple-400", border: "border-purple-500/15 hover:border-purple-500/40",
                iconBg: "bg-purple-500/10 border-purple-500/15", shadow: "hover:shadow-purple-500/10",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`relative glass-card card-shine rounded-2xl p-6 border ${step.border} group hover:-translate-y-2 hover:shadow-xl ${step.shadow} transition-all duration-300`}
              >
                <span className={`text-6xl font-black ${step.accent} opacity-10 leading-none block mb-4 group-hover:opacity-20 transition-opacity duration-300 select-none`}>
                  {step.num}
                </span>
                <div className={`w-9 h-9 rounded-xl ${step.iconBg} border flex items-center justify-center mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* â”€â”€ Feature highlights â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="reveal mt-4" style={{ transitionDelay: "0.15s" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {[
              { icon: "âš¡", label: "Lightning Fast", sub: "Results in seconds" },
              { icon: "ðŸŽ¯", label: "99% Accurate", sub: "Mood detection" },
              { icon: "ðŸŒ", label: "Multilingual", sub: "Hindi & English" },
              { icon: "ðŸ”’", label: "Private", sub: "No data stored" },
            ].map((f, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-4 text-center group hover:-translate-y-1 hover:border-white/15 transition-all duration-300 cursor-default"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300 select-none">
                  {f.icon}
                </div>
                <div className="text-sm font-semibold text-white">{f.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
