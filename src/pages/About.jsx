import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const steps = [
  { title: "Choose a photo", icon: "image", text: "Upload a JPG, PNG, or WebP image up to 10 MB. You can also use one of the example photos. Images stay in your browser." },
  { title: "Set your preferences", icon: "music", text: "Choose a mood and a language. This frontend preview uses curated sample tracks; automatic image analysis is planned for the backend." },
  { title: "Save or listen", icon: "headphones", text: "Open tracks on YouTube, copy the track list, or save a playlist to your library. Saved playlists are stored on this device." },
];

export default function About() {
  return (
    <div className="standard-page">
      <div className="page-intro">
        <h1>How PicTune works</h1>
        <p>A simple way to pair your photos with music. Here’s what you can do in this preview.</p>
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
      <div className="about-cta"><p>Start with your own photo or an example.</p><Link to="/#studio" className="button button-primary">Open studio <Icon name="arrow" size={16} /></Link></div>
    </div>
  );
}
