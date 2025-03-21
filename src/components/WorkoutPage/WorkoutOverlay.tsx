"use client";
import { useState } from "react";
import SpinningWheel from "./Wheel";

interface WorkoutOverlayProps {
  exercises: string[];
  onClose: () => void;
}

const WorkoutOverlay = ({ exercises, onClose }: WorkoutOverlayProps) => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100 text-center">
        {isSpinning ? (
          <SpinningWheel
            exercises={exercises}
            onComplete={(exercise) => {
              setSelectedExercise(exercise);
              setIsSpinning(false);
            }}
          />
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-dark dark:text-white">
              Your Workout:
            </h2>
            <p className="mt-4 text-lg font-medium text-body-color dark:text-dark-6">
              {selectedExercise}
            </p>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={() => setIsSpinning(true)}
            className="mr-3 bg-secondary text-white px-4 py-2 rounded-md"
          >
            Spin Again
          </button>
          <button
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            End Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutOverlay;
