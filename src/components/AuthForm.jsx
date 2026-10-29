import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function AuthForm({ type, onSubmit, error, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const isRegister = type === "register";
  function submit(event) {
    event.preventDefault();
    if (isRegister && password !== confirmPassword) { onSubmit(null, "Your passwords don’t match. Please try again."); return; }
    onSubmit({ email, password, username });
  }
  return <div className="auth-card">
    <h2>{isRegister ? "Create an account" : "Sign in"}</h2><p>{isRegister ? "Enter your details to get started." : "Enter your email and password."}</p>
    {error && <div className="auth-error" role="alert">{error}</div>}
    <form onSubmit={submit} className="auth-form">
      {isRegister && <div><label htmlFor="username">Your name (optional)</label><input id="username" autoComplete="nickname" maxLength={80} value={username} onChange={event => setUsername(event.target.value)} /></div>}
      <div><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></div>
      <div><div className="password-label"><label htmlFor="password">Password</label><button type="button" onClick={() => setShowPassword(!showPassword)} aria-controls="password" aria-pressed={showPassword}>{showPassword ? "Hide" : "Show"}</button></div><input id="password" type={showPassword ? "text" : "password"} autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 8 : undefined} maxLength={128} required value={password} onChange={event => setPassword(event.target.value)} /></div>
      {isRegister && <div><label htmlFor="confirm-password">Confirm password</label><input id="confirm-password" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} /></div>}
      <button type="submit" className="button button-primary" disabled={loading}>{loading ? <><span className="small-spinner" />One moment…</> : <>{isRegister ? "Create my account" : "Sign in"}<Icon name="arrow" size={16} /></>}</button>
    </form>
    <div className="auth-footer">{isRegister ? <>Already have an account? <Link to="/login">Sign in</Link></> : <>New around here? <Link to="/register">Create an account</Link></>}</div>
  </div>;
}
