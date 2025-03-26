"use client";

import { useRouter } from "next/navigation";

interface Exercise {
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
}

interface ExerciseDisplayProps {
  exercise: Exercise | null;
  onSpinAgain: () => void;
  completedExercises: Exercise[]; // ✅ Accept the completed exercises
}

const ExerciseDisplay = ({
  exercise,
  onSpinAgain,
  completedExercises,
}: ExerciseDisplayProps) => {
  if (!exercise) return null;

  const router = useRouter();

  const handleEndWorkout = () => {
    const encoded = encodeURIComponent(JSON.stringify(completedExercises));
    router.push(`/workout/complete?data=${encoded}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-dark dark:text-dark">{exercise.name}</h2>
      <p className="text-body-color font-semibold dark:text-dark mt-2">Type: {exercise.type}</p>
      <p className="text-body-color font-semibold dark:text-dark">Muscle: {exercise.muscle}</p>
      <p className="text-body-color font-semibold dark:text-dark">Difficulty: {exercise.difficulty}</p>
      <p className="text-body-color dark:text-dark mt-4">{exercise.instructions}</p>

      <div className="mt-4">
        <button
          onClick={onSpinAgain}
          className="mr-3 bg-secondary text-white px-4 py-2 rounded-md"
        >
          Next Exercise
        </button>
        <button
          onClick={handleEndWorkout}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          End Workout
        </button>
      </div>
    </div>
  );
};

export default ExerciseDisplay;
