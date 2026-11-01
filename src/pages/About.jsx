import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const steps = [
  { title: "Pick a photo", text: "Any JPG, PNG, WebP or AVIF up to 4 MB. It’s sent securely for processing, and we don’t keep it afterwards." },
  { title: "Get your songs", text: "Choose Hindi, English, Marathi or all three. PicTune tells you what it saw and hands back songs to match. If it could only read the colours, it says so." },
  { title: "Caption it", text: "With Lifetime Pro, every result comes with captions ready to paste, in your language and your tone. You pay for that once." },
  { title: "Keep the good ones", text: "Play any track on YouTube, copy the tracklist for a friend, or save the playlist to your library on this device." },
];

export default function About() {
  return (
    <div className="standard-page">
      <div className="page-intro">
        <h1>How PicTune <em>works</em></h1>
        <p>Four steps, about ten seconds. Here’s what happens between your photo and your playlist.</p>
      </div>
      <div className="process-grid">
        {steps.map((step, index) => (
          <article key={step.title}>
            <span className="process-number mono">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <div className="about-cta"><p>Start with your own photo. It takes seconds.</p><Link to="/#studio" className="button button-primary">Open studio <Icon name="arrow" size={16} /></Link></div>
    </div>
  );
}
