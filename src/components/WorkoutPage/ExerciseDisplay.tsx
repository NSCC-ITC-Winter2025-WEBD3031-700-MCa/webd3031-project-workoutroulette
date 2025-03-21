"use client";

interface ExerciseDisplayProps {
  exercise: { name: string; type: string; muscle: string; difficulty: string; instructions: string } | null;
  onSpinAgain: () => void;
  onClose: () => void;
}

const ExerciseDisplay = ({ exercise, onSpinAgain, onClose }: ExerciseDisplayProps) => {
  if (!exercise) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-dark dark:text-dark">{exercise.name}</h2>
      <p className="text-body-color dark:text-dark mt-2">Type: {exercise.type}</p>
      <p className="text-body-color dark:text-dark">Muscle: {exercise.muscle}</p>
      <p className="text-body-color dark:text-dark">Difficulty: {exercise.difficulty}</p>
      <p className="text-body-color dark:text-dark mt-4">{exercise.instructions}</p>

      <div className="mt-4">
        <button onClick={onSpinAgain} className="mr-3 bg-secondary text-white px-4 py-2 rounded-md">
          Next Exercise
        </button>
        <button onClick={onClose} className="bg-primary text-white px-4 py-2 rounded-md">
          End Workout
        </button>
      </div>
    </div>
  );
};

export default ExerciseDisplay;
