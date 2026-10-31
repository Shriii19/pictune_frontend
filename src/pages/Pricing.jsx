import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { Squiggle } from "../components/Doodles";
import { Ticket } from "../components/ProBanner";
import { useAuth } from "../hooks/useAuth.jsx";
import { usePlan } from "../hooks/usePlan";
import { COMPARISON, LIFETIME, PRO_FEATURES } from "../lib/plan";

const FAQ = [
  { q: "Is it really a one-time payment?", a: `Yes. You pay ${LIFETIME.label} once and Lifetime Pro stays on your account. No subscription, no renewals.` },
  { q: "Do I get new features later?", a: "Yes. Anything we add to Pro later is included, no extra cost." },
  { q: "Why do I need an account?", a: "Your purchase is tied to your PicTune account, so it works on any device you sign in on." },
  { q: "What stays free?", a: "Song picks for your photos and your on-device library. Those stay free for everyone." },
];

function Cell({ value }) {
  if (value === true) return <span className="cell-yes"><Icon name="check" size={16} /><span className="sr-only">Included</span></span>;
  if (value === false) return <span className="cell-no">—<span className="sr-only">Not included</span></span>;
  return <span className="cell-text mono">{value}</span>;
}

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  const { isPro } = usePlan();
  const [notice, setNotice] = useState("");

  function checkout() {
    // Payment provider and account upgrade are wired up on the backend later.
    setNotice("Checkout opens very soon. We’re setting up secure payments now.");
  }

  const cta = isPro
    ? <span className="button button-secondary plan-button" aria-disabled="true"><Icon name="check" size={16} />You already own this</span>
    : isAuthenticated
      ? <button className="button button-primary plan-button" onClick={checkout}>Get Lifetime Pro for {LIFETIME.label}</button>
      : <Link className="button button-primary plan-button" to="/register">Create an account to buy</Link>;

  return (
    <div className="standard-page pricing-page">
      <section className="page-intro pricing-intro">
        <p className="kicker mono">Pricing</p>
        <h1>Songs are free.<br />Captions cost <span className="underlined">{LIFETIME.label}<Squiggle /></span>, once.</h1>
        <p>We didn’t want another monthly subscription in your life. Pay once and keep Pro for as long as PicTune exists.</p>
      </section>

      <section className="plan-grid" aria-label="Plans">
        <article className="plan-card plan-free">
          <p className="mono plan-kicker">Free</p>
          <p className="plan-price">₹0</p>
          <p className="plan-sub">Good for finding the right song.</p>
          <ul>
            <li>Songs picked for your photo</li>
            <li>Hindi, English &amp; Marathi</li>
            <li>Save playlists on this device</li>
            <li className="is-off">No captions</li>
          </ul>
          <Link to="/#studio" className="button button-secondary plan-button">Use it free</Link>
        </article>

        <Ticket stub="Lifetime" serial={`${LIFETIME.label} · paid once`}>
          <p className="mono ticket-kicker">Lifetime Pro</p>
          <p className="ticket-price">{LIFETIME.label}<span className="mono">one time, yours forever</span></p>
          <ul>
            {PRO_FEATURES.map(feature => <li key={feature.title}>{feature.title}</li>)}
            <li>Everything we add to Pro later</li>
          </ul>
          {cta}
          <p className="plan-notice mono" role="status" aria-live="polite">{notice || "Less than a plate of momos."}</p>
        </Ticket>
      </section>

      <section className="perks" aria-labelledby="perks-heading">
        <h2 id="perks-heading">What you get with Pro</h2>
        <dl>
          {PRO_FEATURES.map((feature, index) => (
            <div key={feature.title}>
              <dt><span className="mono">{String(index + 1).padStart(2, "0")}</span>{feature.title}</dt>
              <dd>{feature.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="compare" aria-labelledby="compare-heading">
        <h2 id="compare-heading">Side by side</h2>
        <div className="compare-table" role="table">
          <div className="compare-row compare-head mono" role="row"><span role="columnheader">Feature</span><span role="columnheader">Free</span><span role="columnheader">Pro</span></div>
          {COMPARISON.map(row => <div className="compare-row" role="row" key={row.feature}><span role="cell">{row.feature}</span><span role="cell"><Cell value={row.free} /></span><span role="cell"><Cell value={row.pro} /></span></div>)}
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Questions people ask</h2>
        {FAQ.map(item => <details key={item.q}><summary>{item.q}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}
      </section>
    </div>
  );
}
