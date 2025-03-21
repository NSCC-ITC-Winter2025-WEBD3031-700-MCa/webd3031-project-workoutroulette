"use client";
import { useState } from "react";
import SpinningWheel from "./Wheel";
import ExerciseDisplay from "./ExerciseDisplay"; // Component to display the selected workout

interface WorkoutOverlayProps {
  exercises: { name: string; type: string; muscle: string; difficulty: string; instructions: string }[];
  onClose: () => void;
}

const WorkoutOverlay = ({ exercises, onClose }: WorkoutOverlayProps) => {
  const [selectedExercise, setSelectedExercise] = useState<null | {
    name: string;
    type: string;
    muscle: string;
    difficulty: string;
    instructions: string;
  }>(null);
  const [isSpinning, setIsSpinning] = useState(true);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {isSpinning ? (
          <SpinningWheel
            exercises={exercises.map(ex => ex.name)} // Pass only names
            onComplete={(exerciseName) => {
              const chosenExercise = exercises.find(ex => ex.name === exerciseName);
              setSelectedExercise(chosenExercise || null); // Store full object
              setIsSpinning(false);
            }}
          />
        ) : (
          <ExerciseDisplay exercise={selectedExercise} onSpinAgain={() => setIsSpinning(true)} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default WorkoutOverlay;
