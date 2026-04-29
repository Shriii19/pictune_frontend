import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#FAFAFA] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Typography heavy */}
        <div className="max-w-2xl animate-slide-up">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[2px] w-12 bg-[#111111]"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#666666]">
              Acoustic Vision
            </span>
          </div>

          <h1 className="font-editorial text-7xl sm:text-8xl md:text-[7rem] leading-[0.85] mb-8 text-balance tracking-tighter">
            Hear the <br /> <span className="text-[#888888]">picture.</span>
          </h1>
          
          <p className="text-lg text-[#666666] leading-relaxed mb-10 max-w-md font-medium">
            Upload any photograph. Our system decodes the atmospheric emotion and curates the definitive soundtrack for that exact moment. Minimal. Precise. Human.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/dashboard" className="btn-primary">
              Start Discovery
            </Link>
            <Link to="/about" className="btn-secondary">
              The Process
            </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-[#E5E5EA] flex gap-12">
            <div>
              <div className="font-editorial text-3xl tracking-tight">100k+</div>
              <div className="text-[10px] text-[#888888] uppercase tracking-widest mt-1 font-bold">Photos Scanned</div>
            </div>
            <div>
              <div className="font-editorial text-3xl tracking-tight">0.4s</div>
              <div className="text-[10px] text-[#888888] uppercase tracking-widest mt-1 font-bold">Analysis Time</div>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Image/Mockup */}
        <div className="relative hidden lg:block animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="aspect-[4/5] bg-[#E5E5EA] w-full max-w-md ml-auto relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1493225457124-a1a2a5f5f462?auto=format&fit=crop&q=80&w=800" 
              alt="Atmospheric landscape"
              className="w-full h-full object-cover grayscale opacity-90 contrast-125 hover:scale-105 transition-transform duration-700"
            />
            
            {/* The Analysis Card overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white p-5 border border-[#E5E5EA] shadow-xl">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <div className="text-[10px] uppercase tracking-[0.2em] text-[#888888] mb-1 font-bold">Detected Mood</div>
                   <div className="font-editorial text-xl tracking-tight">Melancholy / Calm</div>
                 </div>
                 <div className="music-bars text-[#111111]">
                   <span/><span/><span/><span/><span/>
                 </div>
               </div>
               
               <div className="space-y-3 pt-4 border-t border-[#F2F2F7]">
                 <div className="flex justify-between items-center">
                   <div>
                     <div className="text-sm font-bold">The Night We Met</div>
                     <div className="text-xs text-[#666666] mt-0.5">Lord Huron</div>
                   </div>
                   <div className="w-8 h-8 border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-colors cursor-pointer">
                     <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 border-[1px] border-[#E5E5EA]"></div>
        </div>

      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="border-t border-[#E5E5EA] pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {[
              { num: "01", title: "Upload", desc: "Select a photograph that captures a specific feeling or atmosphere." },
              { num: "02", title: "Analyze", desc: "Our engine reads the visual context, color grading, and subject matter." },
              { num: "03", title: "Listen", desc: "Instantly receive a curated soundtrack that matches the exact mood." },
            ].map((step, i) => (
              <div key={i} className="group">
                <div className="font-editorial text-4xl text-[#E5E5EA] group-hover:text-[#111111] transition-colors duration-300 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2">{step.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
