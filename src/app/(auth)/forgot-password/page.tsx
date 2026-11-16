"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useApp();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
      </Link>

      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Reset your password</h1>
        <p className="text-xs text-slate-500 mt-1">
          Enter your registered institutional or personal email address to receive password reset instructions.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Account Email</label>
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

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full justify-center py-2.5"
          >
            Send Reset Instructions <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </form>
      ) : (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Reset Link Dispatched
          </div>
          <p className="text-slate-600 leading-relaxed">
            We have transmitted a secure password reset link to <strong>{email}</strong>. Please check your inbox and
            spam filters. The authorization link expires in 60 minutes.
          </p>
          <div className="pt-2">
            <Link href="/reset-password">
              <Button variant="outline" size="sm" className="w-full justify-center">
                Simulate Entering New Password →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

