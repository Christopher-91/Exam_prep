"use client";

import React, { useState } from "react";
import { Plus, Minus, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";

export function BalanceScale({ onComplete }: { onComplete?: () => void }) {
  // Goal: Mystery block X + 3 = 8 => X = 5!
  const mysteryX = 5;
  const leftFixed = 3;
  const [userGuessX, setUserGuessX] = useState(2);
  const rightTarget = 8;

  const leftTotal = userGuessX + leftFixed;
  const isBalanced = leftTotal === rightTarget;

  // Calculate tilt angle in degrees (-15 to +15)
  const diff = rightTarget - leftTotal;
  const tiltAngle = Math.max(-12, Math.min(12, diff * 3));

  const handleUpdate = (val: number) => {
    const nextVal = Math.max(0, Math.min(10, val));
    setUserGuessX(nextVal);
    if (nextVal === mysteryX) {
      onComplete?.();
    }
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl p-6 border border-slate-200 text-slate-800 space-y-4">
      <div className="text-center">
        <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" /> Visual Algebra Balance Scale
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Find the weight of mystery block <strong>[ X ]</strong> so that both sides balance perfectly!
        </p>
      </div>

      {/* SVG Balance Scale */}
      <div className="w-full max-w-md h-52 flex items-center justify-center relative select-none">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Fulcrum Base / Triangle */}
          <polygon points="200,100 175,180 225,180" fill="#334155" />
          <circle cx="200" cy="100" r="7" fill="#64748b" />

          {/* Pivoting Beam */}
          <g
            style={{
              transform: `rotate(${tiltAngle}deg)`,
              transformOrigin: "200px 100px",
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Beam bar */}
            <rect x="50" y="96" width="300" height="8" rx="4" fill="#0f172a" />

            {/* Left Pan Hanger & Plate */}
            <line x1="70" y1="100" x2="70" y2="150" stroke="#94a3b8" strokeWidth="2" />
            <line x1="110" y1="100" x2="110" y2="150" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 60,150 Q 90,165 120,150 Z" fill="#6366f1" />

            {/* Left Blocks: Mystery [X] + 3 */}
            <g transform="translate(68, 115)">
              <rect width="24" height="24" rx="4" fill="#818cf8" stroke="#4338ca" strokeWidth="1.5" />
              <text x="12" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                X
              </text>
            </g>
            <g transform="translate(94, 123)">
              <rect width="18" height="18" rx="3" fill="#38bdf8" />
              <text x="9" y="13" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                3
              </text>
            </g>

            {/* Right Pan Hanger & Plate */}
            <line x1="290" y1="100" x2="290" y2="150" stroke="#94a3b8" strokeWidth="2" />
            <line x1="330" y1="100" x2="330" y2="150" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 280,150 Q 310,165 340,150 Z" fill="#6366f1" />

            {/* Right Target: 8 */}
            <g transform="translate(295, 115)">
              <rect width="32" height="24" rx="4" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
              <text x="16" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                8
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Interactive Controls */}
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <span className="text-xs font-bold text-slate-700">Set weight of [ X ]:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdate(userGuessX - 1)}
            className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-base text-indigo-600">{userGuessX}</span>
          <button
            onClick={() => handleUpdate(userGuessX + 1)}
            className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Status Equation */}
      <div className="text-xs font-mono">
        Equation: <span className="font-bold text-indigo-600">{userGuessX}</span> + 3{" "}
        {isBalanced ? "=" : leftTotal > rightTarget ? ">" : "<"} 8
      </div>

      {isBalanced && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in zoom-in-95">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Brilliant! Since X + 3 = 8, subtracting 3 from both sides gives X = 5!</span>
        </div>
      )}
    </div>
  );
}

