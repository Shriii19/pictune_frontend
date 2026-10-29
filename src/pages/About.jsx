import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const steps = [
  { title: "Choose a photo", icon: "image", text: "Upload a JPG, PNG, WebP, or AVIF image up to 4 MB. The photo is sent securely to PicTune for processing. Raw photo bytes are not saved by the backend." },
  { title: "Get your result", icon: "music", text: "Choose Hindi, English, Marathi, or all three. PicTune returns songs and captions, with the analysis method shown alongside the result. Colour estimates are labelled when scene recognition is unavailable." },
  { title: "Save or listen", icon: "headphones", text: "Open tracks on YouTube, copy the track list, or save a playlist to your library. Saved playlists are stored on this device." },
];

export default function About() {
  return (
    <div className="standard-page">
      <div className="page-intro">
        <h1>How PicTune works</h1>
        <p>Upload a photo, get your result, and keep the songs you like.</p>
      </div>
      <div className="process-grid">
        {steps.map((step, index) => (
          <article key={step.title}>
            <span className="process-number">0{index + 1}<Icon name={step.icon} size={20} /></span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <div className="about-cta"><p>Start with your own photo.</p><Link to="/#studio" className="button button-primary">Open studio <Icon name="arrow" size={16} /></Link></div>
    </div>
  );
}
