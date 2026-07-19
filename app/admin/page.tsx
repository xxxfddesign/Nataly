"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import { AnimatedReveal } from "@/components/AnimatedReveal";

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Не удалось войти");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-20">
      <AnimatedReveal effect="scale" className="w-full max-w-sm">
        <div className="rounded-3xl border border-gold-400/20 bg-ivory-deep/70 p-10 shadow-gold dark:bg-graphite-deep/70">
          <p className="text-center font-signature text-3xl text-gold-500">Art by Natalia</p>
          <h1 className="mt-2 text-center font-display text-2xl">Вход в админ-панель</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="flex items-center gap-3 rounded-xl border border-gold-400/25 px-4 py-3">
              <User size={16} className="text-gold-500" />
              <input
                required
                autoFocus
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Логин"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-gold-400/25 px-4 py-3">
              <Lock size={16} className="text-gold-500" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] py-3.5 text-sm font-semibold uppercase tracking-wider text-graphite shadow-gold transition-all duration-500 hover:bg-right disabled:opacity-60"
            >
              {loading ? "Проверка…" : "Войти"}
            </button>
          </form>
        </div>
      </AnimatedReveal>
    </div>
  );
}
