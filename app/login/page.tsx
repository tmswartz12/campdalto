"use client";
import { useState, FormEvent, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";

function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const isAdmin = params.get("admin") === "1";
  const from = params.get("from") || "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => setError(""), [isAdmin]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, mode: isAdmin ? "admin" : "site" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Wrong password.");
        return;
      }
      router.push(data.redirect || from);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 bg-forest text-bone relative overflow-hidden">
      {/* Topographic backdrop */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.1]"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <path
            key={i}
            d={`M -50 ${60 + i * 50} Q 300 ${20 + i * 50}, 600 ${80 + i * 50} T 1250 ${50 + i * 50}`}
            fill="none"
            stroke="#F4F1EA"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="w-full max-w-sm relative z-10">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="Camp Dalto"
            width={360}
            height={360}
            priority
            className="w-[180px] sm:w-[200px] h-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
            Camp Dalto · 2026
          </p>
        </div>

        {/* Card */}
        <div className="bg-bone text-ink rounded-2xl border border-bone/10 shadow-lift p-7">
          <div className="flex items-center gap-2.5 mb-5">
            <Lock size={14} className="text-clay" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {isAdmin ? "Commissioner Access" : "Rob’s Inner Circle"}
            </span>
          </div>

          <h1 className="display text-3xl md:text-[34px] font-semibold tracking-editorial leading-tight">
            {isAdmin ? "Sign in, Commissioner." : "Speak the word. See the King."}
          </h1>
          <p className="mt-2 text-[14px] text-muted leading-relaxed">
            {isAdmin
              ? "Score updates and roster moves live behind this gate. Rulings are final, binding, and deeply biased."
              : "Rob’s bachelor party only. Don’t share the link. Don’t text Miri. Don’t tag anyone in anything."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <label htmlFor="password" className="sr-only">
              {isAdmin ? "Commissioner password" : "Password"}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isAdmin ? "Commissioner password" : "Password"}
              autoComplete="current-password"
              required
              className="w-full bg-paper border border-ink/15 rounded-lg text-ink placeholder:text-muted/70 text-[15px] px-4 py-3 focus:outline-none focus:border-ink/50 transition-colors"
            />

            {error && (
              <p className="text-clay text-[13px] font-medium" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-ink hover:bg-forest disabled:bg-ink/40 text-bone font-body text-[14px] font-semibold py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {loading ? "Checking…" : "Enter Camp"}
            </button>
          </form>

          {isAdmin && (
            <p className="mt-5 text-center text-[12px] text-muted">
              <a href="/login" className="hover:text-ink transition-colors">
                ← Back to guest login
              </a>
            </p>
          )}
        </div>

        <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40 mt-6">
          Don&apos;t know the password? Ask the Commissioner.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
