"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export function FractionExplorer({ onComplete }: { onComplete?: () => void }) {
  const [slices, setSlices] = useState(4);
  const [selectedSlices, setSelectedSlices] = useState(2);

  const percentage = Math.round((selectedSlices / slices) * 100);

  const handleSliceChange = (newSlices: number) => {
    setSlices(newSlices);
    setSelectedSlices(Math.min(selectedSlices, newSlices));
  };

  const handleSelectSlice = (index: number) => {
    if (index + 1 === selectedSlices) {
      setSelectedSlices(index);
    } else {
      setSelectedSlices(index + 1);
    }
    if ((index + 1) / slices === 0.5) {
      onComplete?.();
    }
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl p-6 border border-slate-200 text-slate-800 space-y-4">
      <div className="text-center">
        <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" /> Fraction Pizza & Bar Explorer
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Click the slices to fill the pizza and discover equivalent fraction values!
        </p>
      </div>

      {/* Slices count selector */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-slate-600">Cut Pizza into:</span>
        {[2, 4, 6, 8].map((n) => (
          <button
            key={n}
            onClick={() => handleSliceChange(n)}
            className={`px-2.5 py-1 rounded-lg border font-bold transition-colors ${
              slices === n ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {n} Slices
          </button>
        ))}
      </div>

      {/* Visual Fraction Bar */}
      <div className="w-full max-w-sm">
        <div className="flex rounded-xl overflow-hidden border-2 border-slate-800 h-12 shadow-sm bg-slate-100">
          {Array.from({ length: slices }).map((_, i) => {
            const isFilled = i < selectedSlices;
            return (
              <button
                key={i}
                onClick={() => handleSelectSlice(i)}
                className={`flex-1 border-r border-slate-800 last:border-r-0 transition-colors flex items-center justify-center font-bold text-xs ${
                  isFilled ? "bg-amber-400 text-amber-950" : "bg-white text-slate-400 hover:bg-amber-100"
                }`}
              >
                1/{slices}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fraction Value Readout */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-center w-full max-w-sm">
        <div className="text-2xl font-black text-amber-900">
          {selectedSlices} / {slices}
        </div>
        <div className="text-xs text-amber-800 font-semibold mt-1">
          Equals {percentage}% of the whole!
          {percentage === 50 && " (Equivalent to exactly 1/2!)"}
        </div>
      </div>

      {percentage === 50 && (
        <div className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Great discovery! {selectedSlices}/{slices} is exactly one half (1/2)!</span>
        </div>
      )}
    </div>
  );
}

