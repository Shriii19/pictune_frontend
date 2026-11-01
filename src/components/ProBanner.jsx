import { Link } from "react-router-dom";
import Icon from "./Icon";
import { usePlan } from "../hooks/usePlan";
import { LIFETIME, PRO_FEATURES } from "../lib/plan";

export function Ticket({ children, stub = "Admit one", serial = "No. 000099" }) {
  return (
    <div className="ticket">
      <div className="ticket-main">{children}</div>
      <div className="ticket-stub mono" aria-hidden="true"><span>{stub}</span><span>{serial}</span></div>
    </div>
  );
}

export default function ProBanner() {
  const { isPro } = usePlan();
  if (isPro) return null;
  return (
    <section className="pro-banner" aria-label="Lifetime Pro">
      <div className="pro-banner-copy">
        <h2>Pay once. <em>Caption forever.</em></h2>
        <p>No subscription and no renewals. One payment unlocks captions on every photo you’ll ever upload, plus whatever we build next.</p>
      </div>
      <Ticket>
        <p className="mono ticket-kicker">PicTune · Lifetime Pro</p>
        <p className="ticket-price">{LIFETIME.label}<span className="mono">one time</span></p>
        <ul>{PRO_FEATURES.slice(0, 4).map(feature => <li key={feature.title}>{feature.title}</li>)}</ul>
        <Link to="/pricing" className="button button-primary">See what’s included <Icon name="arrow" size={16} /></Link>
      </Ticket>
    </section>
  );
}
