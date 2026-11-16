"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useApp();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    await resetPassword(password);
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Return to login
      </Link>

      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Set a new password</h1>
        <p className="text-xs text-slate-500 mt-1">
          Create a secure password with a combination of letters, numbers, and symbols.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-md">
          {error}
        </div>
      )}

      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full justify-center py-2.5"
          >
            Update Password <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </form>
      ) : (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-xs text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="font-bold text-slate-900 text-sm">Password Updated Successfully</h4>
          <p className="text-slate-600">Your account security credentials have been updated.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/login")}
            className="w-full justify-center"
          >
            Proceed to Sign In
          </Button>
        </div>
      )}
    </div>
  );
}

