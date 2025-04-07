// components/LevelBadge.tsx
"use client";

import React from "react";


interface LevelBadgeProps {
  level: string | number;
  xp: number | string;
  xpForNextLevel: number; // ✅ <-- This was missing
}

const LevelBadge = ({ level, xp, xpForNextLevel }: LevelBadgeProps) => {
  const xpNum = typeof xp === "string" ? parseInt(xp) : xp;
  const levelNum = typeof level === "string" ? parseInt(level) : level;

  const progress = Math.min(100, Math.round((xpNum / xpForNextLevel) * 100));

  return (
    <div className="flex flex-col items-start text-sm text-gray-700 dark:text-gray-200">
      <span className="font-semibold">Level {levelNum}</span>
      <div className="relative w-32 h-2 mt-1 bg-gray-300 rounded-full">
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-1 text-xs text-gray-500 dark:text-white">
        {xpNum} / {xpForNextLevel} XP
      </span>
    </div>
  );
};

export default LevelBadge;
