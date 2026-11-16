"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";

export function GravitySim({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [gravityStrength, setGravityStrength] = useState(2500);
  const [satelliteVelocity, setSatelliteVelocity] = useState(3.2);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Sun / Central Star
    const starRadius = 24;

    // Planet / Satellite state
    let satX = centerX + 140;
    let satY = centerY;
    let satVx = 0;
    let satVy = -satelliteVelocity;
    const satRadius = 9;

    // Trail
    const trail: { x: number; y: number; alpha: number }[] = [];
    let completedOrbits = 0;
    let prevAngle = Math.atan2(satY - centerY, satX - centerX);

    const render = () => {
      // Background space
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint star dots in background
      ctx.fillStyle = "#ffffff33";
      ctx.fillRect(40, 50, 2, 2);
      ctx.fillRect(120, 180, 1.5, 1.5);
      ctx.fillRect(380, 70, 2, 2);
      ctx.fillRect(450, 220, 1.5, 1.5);

      if (isRunning) {
        // Physics update
        const dx = centerX - satX;
        const dy = centerY - satY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist > 15 && dist < 450) {
          const force = gravityStrength / distSq;
          const ax = (force * dx) / dist;
          const ay = (force * dy) / dist;

          satVx += ax * 0.16;
          satVy += ay * 0.16;

          satX += satVx * 0.16 * 10;
          satY += satVy * 0.16 * 10;

          // Check orbit revolution
          const currentAngle = Math.atan2(satY - centerY, satX - centerX);
          if (prevAngle < 0 && currentAngle >= 0 && satX > centerX) {
            completedOrbits += 1;
            if (completedOrbits >= 1 && !hasCompleted) {
              setHasCompleted(true);
              onComplete?.();
            }
          }
          prevAngle = currentAngle;

          trail.push({ x: satX, y: satY, alpha: 1.0 });
          if (trail.length > 90) trail.shift();
        } else {
          // Reset if crashed or flew too far
          satX = centerX + 140;
          satY = centerY;
          satVx = 0;
          satVy = -satelliteVelocity;
        }
      }

      // Draw Trail
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${(i / trail.length) * 0.7})`;
        ctx.fill();
      }

      // Draw Sun / Star
      const sunGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, starRadius * 1.5);
      sunGrad.addColorStop(0, "#fbbf24");
      sunGrad.addColorStop(0.5, "#f59e0b");
      sunGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, starRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fef08a";
      ctx.beginPath();
      ctx.arc(centerX, centerY, starRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw Orbiting Planet
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(satX, satY, satRadius, 0, Math.PI * 2);
      ctx.fill();

      // Planet atmosphere ring
      ctx.strokeStyle = "#7dd3fc";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(satX, satY, satRadius + 2, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, gravityStrength, satelliteVelocity, hasCompleted, onComplete]);

  const resetSatellite = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setGravityStrength(2500);
    setSatelliteVelocity(3.2);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 rounded-2xl p-4 border border-slate-800 text-white space-y-4">
      <div className="flex items-center justify-between w-full px-2">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-1.5 text-indigo-300">
            <Sparkles className="w-4 h-4 text-amber-400" /> Interactive Orbital Physics Simulation
          </h4>
          <p className="text-[11px] text-slate-400">
            Adjust gravity & velocity to achieve a stable circular or elliptical orbit!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsRunning(!isRunning)}
            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isRunning ? "Pause" : "Play"}
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={resetSatellite}
            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-inner">
        <canvas ref={canvasRef} width={540} height={320} className="w-full max-w-[540px] block" />
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-4 w-full text-xs px-2 pt-1">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Star Gravity (M)</span>
            <span className="font-mono text-indigo-400">{gravityStrength}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="4500"
            step="100"
            value={gravityStrength}
            onChange={(e) => setGravityStrength(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Satellite Launch Speed</span>
            <span className="font-mono text-sky-400">{satelliteVelocity} km/s</span>
          </div>
          <input
            type="range"
            min="1.5"
            max="5.0"
            step="0.1"
            value={satelliteVelocity}
            onChange={(e) => setSatelliteVelocity(Number(e.target.value))}
            className="w-full accent-sky-500"
          />
        </div>
      </div>

      {hasCompleted && (
        <div className="w-full p-2.5 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-center text-xs text-emerald-300 font-semibold animate-in fade-in">
          ★ Stellar Job! You maintained a stable orbital trajectory! 3 Stars Awarded!
        </div>
      )}
    </div>
  );
}

