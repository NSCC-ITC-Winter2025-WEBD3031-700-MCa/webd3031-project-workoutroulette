import { useState } from "react";
import SpinningWheel from "../SpinningWheel"; // Wheel component
import WorkoutDetails from "../WorkoutDetails"; // Display selected workout

const WorkoutOverlay = ({ filters, onClose }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);

  const handleSpinComplete = (exercise) => {
    setSelectedExercise(exercise);
    setIsSpinning(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {isSpinning ? (
          <SpinningWheel filters={filters} onComplete={handleSpinComplete} />
        ) : (
          <WorkoutDetails exercise={selectedExercise} />
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
