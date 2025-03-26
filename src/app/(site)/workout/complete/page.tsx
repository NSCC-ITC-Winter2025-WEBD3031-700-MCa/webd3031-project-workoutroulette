"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Exercise {
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
}

export default function WorkoutComplete() {
  const searchParams = useSearchParams();
  const completedRaw = searchParams.get("data");

  const completedExercises: Exercise[] = completedRaw
    ? JSON.parse(decodeURIComponent(completedRaw))
    : [];

  // XP result from the server
  const [xpResult, setXpResult] = useState<{ xp: number; level: number } | null>(null);

  // Calculate the XP to award
  const totalXP = completedExercises.length * 25;

  // Automatically claim XP on page load
  useEffect(() => {
    async function autoClaimXP() {
      try {
        const res = await fetch("/api/updateXP", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ xpEarned: totalXP }),
        });
        if (!res.ok) throw new Error("Failed to update XP");
        const data = await res.json();
        setXpResult({ xp: data.xp, level: data.level });
      } catch (error) {
        console.error(error);
        // You can show an error message or fallback here
      }
    }

    // If totalXP is zero, you can skip or handle differently
    if (totalXP > 0) {
      autoClaimXP();
    }
  }, [totalXP]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-10 bg-white dark:bg-dark-2 text-dark dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Workout Complete 🎉</h1>
      <p className="text-lg mb-6">You crushed it! Here’s what you completed:</p>

      <ul className="text-left w-full max-w-lg">
        {completedExercises.map((ex, index) => (
          <li key={index} className="mb-2 border-b py-2">
            <strong>{ex.name}</strong> — {ex.muscle} ({ex.type}, {ex.difficulty})
          </li>
        ))}
      </ul>

      <div className="mt-6 text-xl font-semibold">
        🏅 Total XP Earned: <span className="text-primary">{totalXP}</span>
      </div>

      {xpResult ? (
        <div className="mt-4 text-lg">
          <p>
            Your XP is now <strong>{xpResult.xp}</strong> and you’re level{" "}
            <strong>{xpResult.level}</strong>.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-lg text-gray-500">Claiming XP...</p>
      )}
    </section>
  );
}
