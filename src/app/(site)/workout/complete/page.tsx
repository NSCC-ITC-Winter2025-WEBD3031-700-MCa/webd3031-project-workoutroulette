"use client";

import { useSearchParams } from "next/navigation";

interface Exercise {
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
}

const WorkoutComplete = () => {
  const searchParams = useSearchParams();
  const completedRaw = searchParams.get("data");

  const completedExercises: Exercise[] = completedRaw
    ? JSON.parse(decodeURIComponent(completedRaw))
    : [];

  const totalXP = completedExercises.length * 25;

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
    </section>
  );
};

export default WorkoutComplete;
