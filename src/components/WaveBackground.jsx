export default function WaveBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
      <svg
        className="w-full h-full animate-pulse"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="url(#grad)"
          d="M0,160L80,170C160,180,320,200,480,186.7C640,173,800,127,960,128C1120,128,1280,173,1360,197.3L1440,224L1440,320L0,320Z"
        />
        <defs>
          <linearGradient id="grad">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}