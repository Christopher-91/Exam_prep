"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { currentUser, verifyEmail } = useApp();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleInputChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...code];
    updated[index] = val;
    setCode(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await verifyEmail(code.join(""));
    setLoading(false);
    setVerified(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Verify your email address</h1>
        <p className="text-xs text-slate-500 mt-1">
          We transmitted a 6-digit confirmation security code to{" "}
          <strong className="text-slate-800">{currentUser?.email || "your registered email"}</strong>.
        </p>
      </div>

      {!verified ? (
        <form onSubmit={handleVerify} className="space-y-6 text-xs">
          <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                className="w-11 h-12 text-center text-lg font-bold border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950"
                autoFocus={idx === 0}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full justify-center py-2.5"
          >
            Confirm Email <ArrowRight className="w-3.5 h-3.5" />
          </Button>

          <div className="text-center text-xs text-slate-400">
            Didn't receive code?{" "}
            <button
              type="button"
              onClick={() => alert("Verification code re-sent to your email.")}
              className="text-slate-700 underline font-medium hover:text-slate-900"
            >
              Resend code
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center space-y-2 text-xs">
          <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
          <h4 className="font-bold text-slate-900">Email Address Verified</h4>
          <p className="text-slate-500">Redirecting to candidate onboarding setup...</p>
        </div>
      )}
    </div>
  );
}

