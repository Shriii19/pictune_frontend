import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-transparent text-slate-200">
      {/* Background glow effects to dissolve and mix */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Typography heavy */}
        <div className="max-w-2xl animate-slide-up relative z-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-300">
              Acoustic Vision
            </span>
          </div>

          <h1 className="font-editorial text-7xl sm:text-8xl md:text-[7rem] leading-[0.85] mb-8 text-balance tracking-tighter drop-shadow-lg">
            Hear the <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">picture.</span>
          </h1>
          
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-md font-medium">
            Upload any photograph. Our system decodes the atmospheric emotion and curates the definitive soundtrack for that exact moment. Minimal. Precise. Human.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/dashboard" className="btn-primary shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
              Start Discovery
            </Link>
            <Link to="/about" className="btn-secondary">
              The Process
            </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex gap-12">
            <div>
              <div className="font-editorial text-3xl tracking-tight text-white drop-shadow-md">100k+</div>
              <div className="text-[10px] text-purple-300 uppercase tracking-widest mt-1 font-bold">Photos Scanned</div>
            </div>
            <div>
              <div className="font-editorial text-3xl tracking-tight text-white drop-shadow-md">0.4s</div>
              <div className="text-[10px] text-purple-300 uppercase tracking-widest mt-1 font-bold">Analysis Time</div>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Image/Mockup */}
        <div className="relative hidden lg:block animate-slide-up z-10" style={{ animationDelay: "0.2s" }}>
          <div className="aspect-[4/5] bg-slate-900 w-full max-w-md ml-auto relative overflow-hidden rounded-2xl shadow-2xl shadow-purple-900/50 border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800" 
              alt="Atmospheric concert"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700 hover:opacity-100"
            />
            
            {/* The Analysis Card overlay */}
            <div className="absolute bottom-6 left-6 right-6 glass-card p-5 border border-white/20 shadow-2xl">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <div className="text-[10px] uppercase tracking-[0.2em] text-purple-300 mb-1 font-bold">Detected Mood</div>
                   <div className="font-editorial text-xl tracking-tight text-white">Euphoric / Energetic</div>
                 </div>
                 <div className="music-bars text-pink-400">
                   <span/><span/><span/><span/><span/>
                 </div>
               </div>
               
               <div className="space-y-3 pt-4 border-t border-white/10">
                 <div className="flex justify-between items-center">
                   <div>
                     <div className="text-sm font-bold text-white">The Night We Met</div>
                     <div className="text-xs text-slate-300 mt-0.5">Lord Huron</div>
                   </div>
                   <div className="w-8 h-8 rounded-full border border-purple-500 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all cursor-pointer shadow-lg shadow-purple-500/20 text-purple-400">
                     <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="border-t border-white/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {[
              { num: "01", title: "Upload", desc: "Select a photograph that captures a specific feeling or atmosphere." },
              { num: "02", title: "Analyze", desc: "Our engine reads the visual context, color grading, and subject matter." },
              { num: "03", title: "Listen", desc: "Instantly receive a curated soundtrack that matches the exact mood." },
            ].map((step, i) => (
              <div key={i} className="group p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/10">
                <div className="font-editorial text-5xl text-white/10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-300 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2 text-slate-200 group-hover:text-white transition-colors">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
