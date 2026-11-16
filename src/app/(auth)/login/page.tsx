"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Check } from "lucide-react";
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
        router.push("/");
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
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async (role: UserRole) => {
    const demoAccounts: Record<UserRole, { email: string; pass: string }> = {
      student: { email: "rohan@acuitysystems.edu", pass: "password123" },
      parent: { email: "sarah.vance@gmail.com", pass: "password123" },
      professional: { email: "david.miller@mckinsey.com", pass: "password123" },
      admin: { email: "admin@acuityedu.com", pass: "password123" },
    };

    const target = demoAccounts[role];
    setEmail(target.email);
    setPassword(target.pass);

    setLoading(true);
    await login(target.email, target.pass, true);
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sign in to your account</h1>
        <p className="text-xs text-slate-500 mt-1">
          Access your personalized examination curriculum, active recall decks, and analytical readiness.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Google SSO Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
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
        <span>Continue with Google Single Sign-On</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-medium shrink-0">
          Or continue with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="font-semibold text-slate-700 mb-1 block">Institutional or Personal Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="candidate@stanford.edu"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold text-slate-700 block">Password</label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
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
              className="w-full pl-9 pr-9 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
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
              className="rounded border-slate-300 text-slate-900 focus:ring-slate-950"
            />
            <span className="text-xs text-slate-600">Keep me signed in on this device</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          className="w-full justify-center py-2.5"
        >
          Sign In to Portal <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </form>

      {/* Demo Sign-in Shortcuts for Review */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-2">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
          One-Click Demo Credentials:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={() => handleDemoSignIn("student")}
            className="p-1.5 text-[11px] font-medium bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-800"
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleDemoSignIn("parent")}
            className="p-1.5 text-[11px] font-medium bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-800"
          >
            Parent
          </button>
          <button
            type="button"
            onClick={() => handleDemoSignIn("professional")}
            className="p-1.5 text-[11px] font-medium bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-800"
          >
            Professional
          </button>
          <button
            type="button"
            onClick={() => handleDemoSignIn("admin")}
            className="p-1.5 text-[11px] font-medium bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-800"
          >
            Admin
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        New candidate or institution?{" "}
        <Link href="/signup" className="font-semibold text-slate-900 underline hover:text-slate-800">
          Create an account
        </Link>
      </div>
    </div>
  );
}

