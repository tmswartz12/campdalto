"use client";
import { useState, FormEvent, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import PennantRow from "@/components/ui/PennantRow";

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
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(180deg, #2d4a2b 0%, #1e3a5f 100%)" }}
    >
      <div className="w-full max-w-sm">
        {/* Pennants */}
        <div className="flex justify-center mb-6">
          <PennantRow count={7} className="max-w-[18rem]" />
        </div>

        {/* Wooden sign */}
        <div
          className="rounded-sm px-8 py-8 wood-grain"
          style={{
            background: "linear-gradient(160deg, #5a3d24 0%, #3b2518 60%, #2b1a10 100%)",
            boxShadow:
              "inset 0 2px 6px rgba(255,255,255,0.12), inset 0 -12px 20px rgba(0,0,0,0.5), 0 18px 36px rgba(0,0,0,0.45)",
          }}
        >
          <h1 className="font-display text-mustard text-3xl uppercase tracking-widest text-center mb-1">
            Camp Dalto
          </h1>
          <p className="font-marker text-cream/60 text-sm text-center mb-7">
            {isAdmin ? "Commissioner access only" : "Bachelor party members only — know the word"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="font-body text-cream/70 text-xs uppercase tracking-widest mb-2 block"
              >
                {isAdmin ? "Commissioner password" : "Password"}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isAdmin ? "••••••••••" : "you know the word"}
                autoComplete="current-password"
                required
                className="w-full bg-black/20 border border-cream/20 rounded text-cream font-body placeholder:text-cream/30 px-4 py-3 focus:outline-none focus:border-mustard/60 transition-colors"
              />
            </div>

            {error && (
              <p className="font-marker text-burnt text-sm text-center animate-bounce">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-mustard hover:bg-mustard/90 text-charcoal font-display text-sm uppercase tracking-widest py-3 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Checking..." : "Enter Camp"}
            </button>
          </form>

          {isAdmin && (
            <p className="mt-5 text-center font-marker text-cream/30 text-xs">
              ← <a href="/login" className="hover:text-cream/60 transition-colors">Back to guest login</a>
            </p>
          )}
        </div>

        <p className="text-center font-marker text-cream/25 text-xs mt-6">
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
