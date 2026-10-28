import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Icon from "./Icon";

export default function AuthForm({ type, onSubmit, error, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [oauthError, setOauthError] = useState("");
  const [oauthLoading, setOauthLoading] = useState(false);
  const isRegister = type === "register";
  const backendEnabled = import.meta.env.VITE_ENABLE_BACKEND === "true";

  function submit(e) {
    e.preventDefault();
    if (isRegister && password !== confirmPassword) {
      onSubmit(null, "Your passwords don’t match. Please try again.");
      return;
    }
    onSubmit({ email, password, username, phone });
  }

  async function googleLogin() {
    if (!supabase || !backendEnabled) return;
    setOauthLoading(true);
    setOauthError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
      if (error) throw error;
    } catch (err) {
      setOauthError(err.message || "Google sign-in is unavailable right now.");
    } finally {
      setOauthLoading(false);
    }
  }

  return <div className="auth-card"><h2>{isRegister ? "Create an account" : "Sign in"}</h2><p>{isRegister ? "Enter your details to get started." : "Enter your email and password."}</p>{(error || oauthError) && <div className="auth-error" role="alert">{error || oauthError}</div>}<form onSubmit={submit} className="auth-form">
    {isRegister && <><div><label htmlFor="username">Your name</label><input id="username" autoComplete="nickname" required value={username} onChange={e => setUsername(e.target.value)} placeholder="What should we call you?"/></div><div><label htmlFor="phone">Phone number</label><input id="phone" type="tel" autoComplete="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"/></div></>}
    <div><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"/></div>
    <div><div className="password-label"><label htmlFor="password">Password</label><button type="button" onClick={() => setShowPassword(!showPassword)} aria-controls="password" aria-pressed={showPassword}>{showPassword ? "Hide" : "Show"}</button></div><input id="password" type={showPassword ? "text" : "password"} autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 8 : undefined} required value={password} onChange={e => setPassword(e.target.value)} placeholder={isRegister ? "At least 8 characters" : "Your password"}/></div>
    {isRegister && <div><label htmlFor="confirm-password">Confirm password</label><input id="confirm-password" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="One more time"/></div>}
    <button type="submit" className="button button-primary" disabled={loading}>{loading ? <><span className="small-spinner"/>One moment…</> : <>{isRegister ? "Create my account" : "Sign in"}<Icon name="arrow" size={16}/></>}</button>
    <div className="auth-divider">or</div>
    <button type="button" className="button button-secondary" disabled={!supabase || !backendEnabled || oauthLoading} onClick={googleLogin}>{oauthLoading ? "Connecting…" : backendEnabled && supabase ? "Continue with Google" : "Google sign-in · coming soon"}</button>
  </form><div className="auth-footer">{isRegister ? <>Already have an account? <Link to="/login">Sign in</Link></> : <>New around here? <Link to="/register">Create an account</Link></>}</div>{!backendEnabled && <div className="auth-preview-note">Accounts arrive in the backend phase. In the meantime, <Link to="/#studio">explore the studio without signing in →</Link></div>}</div>;
}
