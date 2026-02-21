import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm({ type, onSubmit, error, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isRegister = type === "register";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister && password !== confirmPassword) {
      onSubmit(null, "Passwords do not match");
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-50">
          {isRegister ? "Create an account" : "Welcome back"}
        </h2>
        <p className="text-slate-400 mt-2 text-sm">
          {isRegister
            ? "Sign up to start using PicTune"
            : "Log in to your account"}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            placeholder="••••••••"
          />
        </div>

        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-white disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loading ? "Please wait..." : isRegister ? "Sign Up" : "Log In"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Log in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
