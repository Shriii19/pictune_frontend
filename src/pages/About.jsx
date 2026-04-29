import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center px-6 py-16 bg-[#FAFAFA] text-[#111111]">
      {/* Page Header */}
      <div className="text-center mb-16 animate-slide-up max-w-2xl">
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
          The Process
        </h1>
        <p className="text-[#666666] mt-4 text-sm uppercase tracking-widest font-bold">
          How PicTune decodes aesthetics.
        </p>
      </div>

      {/* ── Mission Statement ────────────────────────────────── */}
      <section className="w-full max-w-4xl mb-16 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="bg-white border border-[#E5E5EA] p-10 md:p-16 text-center shadow-sm">
          <h2 className="font-editorial text-3xl tracking-tight text-[#111111] mb-6">
            Bridging Visuals & Acoustic Emotion
          </h2>
          <p className="text-[#666666] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
            We built PicTune on the premise that every aesthetic moment possesses an inherent rhythm. A sunset, an industrial concrete wall, a crowded street—each carries a frequency. Our system reads the emotional vectors of your photography and pairs them with curated soundscapes.
          </p>

          {/* Feature pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left border-t border-[#E5E5EA] pt-12">
            {[
              {
                title: "Visual Analysis",
                desc: "The engine extracts emotional context, dominant colors, and subject matter from the raw image.",
              },
              {
                title: "Sonic Matching",
                desc: "We cross-reference these vectors against a curated database of tracks to find the exact acoustic equivalent.",
              },
              {
                title: "Archival Memory",
                desc: "Save your analysis and return to the specific feelings captured in past visual moments.",
              },
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="font-editorial text-2xl text-[#E5E5EA] group-hover:text-[#111111] transition-colors duration-300 mb-3">
                  0{idx + 1}
                </div>
                <h3 className="text-xs font-bold text-[#111111] uppercase tracking-widest mb-2">{item.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="w-full max-w-4xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="bg-[#111111] text-white p-10 md:p-16 text-center">
          <h3 className="font-editorial text-3xl mb-4 tracking-tight">Initiate Analysis</h3>
          <p className="text-[#888888] text-xs font-bold uppercase tracking-widest mb-8">
            Upload your first photograph and discover its sound.
          </p>
          <Link
            to="/dashboard"
            className="btn-primary bg-white text-[#111111] hover:bg-[#E5E5EA]"
          >
            Go to Studio
          </Link>
        </div>
      </section>
    </div>
  );
}
