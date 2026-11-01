// Small hand-drawn pieces shared across pages.

export function Squiggle({ className = "" }) {
  return (
    <svg className={`squiggle ${className}`} viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 9c18-6 34-6 50-1s30 5 46-1 33-6 50 0 28 5 48-2" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ className = "" }) {
  return (
    <svg className={`doodle-arrow ${className}`} viewBox="0 0 40 36" aria-hidden="true">
      <path d="M4 6c12-4 24-2 26 8s-2 14-4 18M19 25l7 7 6-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Circled({ children }) {
  return (
    <span className="circled">
      {children}
      <svg viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true">
        <path d="M14 30C10 14 46 5 74 6c26 1 44 10 40 23-4 14-38 18-64 16C24 43 4 36 8 22c3-10 18-15 32-17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Vinyl({ spinning = false, label = "Side A" }) {
  return (
    <span className={`vinyl ${spinning ? "is-spinning" : ""}`} aria-hidden="true">
      <span className="vinyl-label"><span>{label}</span></span>
    </span>
  );
}

export function Polaroid({ src, alt = "", caption, tilt = -3, className = "", children }) {
  return (
    <figure className={`polaroid ${className}`} style={{ "--tilt": `${tilt}deg` }}>
      <span className="tape" aria-hidden="true" />
      <div className="polaroid-photo">{src ? <img src={src} alt={alt} /> : children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
