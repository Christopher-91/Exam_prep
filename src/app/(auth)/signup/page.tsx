"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { UserRole } from "@/lib/types";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState<UserRole>("student");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("You must accept the academic Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const res = await signup(name, email, password, accountType);
      if (res.success) {
        router.push("/onboarding");
      } else {
        setErrorMessage(res.error || "Failed to create account.");
      }
    } catch (err) {
      setErrorMessage("An unexpected registration error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create your candidate account</h1>
        <p className="text-xs text-slate-500 mt-1">
          Begin standardized preparation, spaced repetition tracking, and diagnostic baseline assessments.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Account Type Selection */}
      <div className="space-y-1.5">
        <label className="font-semibold text-slate-700 text-xs block">Select Account Classification</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "student" as UserRole, label: "Student", desc: "Exam preparation" },
            { id: "parent" as UserRole, label: "Parent", desc: "Family & STEM" },
            { id: "professional" as UserRole, label: "Professional", desc: "Career & tests" },
          ].map((type) => {
            const isSelected = accountType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setAccountType(type.id)}
                className={`p-2.5 rounded-md border text-left transition-colors ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="font-semibold text-xs">{type.label}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                  {type.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div>
          <label className="font-semibold text-slate-700 mb-1 block">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950"
              required
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 mb-1 block">Institutional / Primary Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. e.vance@stanford.edu"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-semibold text-slate-700 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
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
            <label className="font-semibold text-slate-700 mb-1 block">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type password"
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-950"
            />
            <span className="text-[11px] text-slate-600 leading-snug">
              I agree to the <span className="underline text-slate-900">Academic Terms of Use</span> and{" "}
              <span className="underline text-slate-900">Privacy Policy</span>, and consent to analytical diagnostic calibration.
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          className="w-full justify-center py-2.5 mt-2"
        >
          Create Candidate Account <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-slate-900 underline hover:text-slate-800">
          Sign in
        </Link>
      </div>
    </div>
  );
}

