"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const result = await login(email, password, rememberMe);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(result.error || "Invalid credentials.");
      }
    } catch (err) {
      setErrorMessage("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async (role: UserRole) => {
    const demoAccounts: Record<UserRole, { email: string; pass: string }> = {
      student: { email: "rohan@acuitysystems.edu", pass: "password123" },
      parent: { email: "parent@acuitysystems.edu", pass: "password123" },
      professional: { email: "pro@acuitysystems.edu", pass: "password123" },
      admin: { email: "admin@acuitysystems.edu", pass: "password123" },
    };

    const target = demoAccounts[role];
    setEmail(target.email);
    setPassword(target.pass);

    setLoading(true);
    await login(target.email, target.pass, true);
    router.push("/dashboard");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sign in to your account
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Access your personalized curriculum, active recall decks, and diagnostic analytics.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Google SSO Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white dark:bg-[#181a24] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-[#1e2230] rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
        <span className="bg-white dark:bg-[#161822] px-3 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold shrink-0">
          Or continue with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
            Email address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rohan@example.com"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#12141c] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300 block">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-[#12141c] border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">Keep me signed in</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Demo Sign-in Shortcuts */}
      <div className="p-3 bg-slate-50 dark:bg-[#11131a] border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Quick Demo Sign-In
          </span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">1-Click Access</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => handleDemoSignIn("student")}
            className="p-2 text-left text-xs rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#181a24] hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="font-semibold text-slate-900 dark:text-white text-[11px]">Student</div>
            <div className="text-[10px] text-slate-400">Rohan Christopher</div>
          </button>
          <button
            type="button"
            onClick={() => handleDemoSignIn("parent")}
            className="p-2 text-left text-xs rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#181a24] hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="font-semibold text-slate-900 dark:text-white text-[11px]">Parent</div>
            <div className="text-[10px] text-slate-400">Family & STEM</div>
          </button>
          <button
            type="button"
            onClick={() => handleDemoSignIn("professional")}
            className="p-2 text-left text-xs rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#181a24] hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="font-semibold text-slate-900 dark:text-white text-[11px]">Professional</div>
            <div className="text-[10px] text-slate-400">GMAT & Executive</div>
          </button>
          <button
            type="button"
            onClick={() => handleDemoSignIn("admin")}
            className="p-2 text-left text-xs rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#181a24] hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="font-semibold text-slate-900 dark:text-white text-[11px]">Administrator</div>
            <div className="text-[10px] text-slate-400">Academic Staff</div>
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-1">
        New candidate?{" "}
        <Link href="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}
