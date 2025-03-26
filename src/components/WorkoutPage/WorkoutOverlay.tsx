"use client";
import { useEffect, useState } from "react";
import SpinningWheel from "./Wheel";
import ExerciseDisplay from "./ExerciseDisplay";

interface Exercise {
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
}

interface WorkoutOverlayProps {
  selectedMuscles: string[];
  selectedTypes: string[];
  onClose: (completed: Exercise[]) => void; // Optional if using router.push inside ExerciseDisplay
}

const WorkoutOverlay = ({ selectedMuscles, selectedTypes }: WorkoutOverlayProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array: Exercise[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const fetchNewExercises = async () => {
    setLoading(true);
    let allExercises: Exercise[] = [];

    try {
      for (const muscle of selectedMuscles) {
        for (const type of selectedTypes) {
          const res = await fetch(
            `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=${type}&difficulty=beginner`,
            { headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY! } }
          );
          const data = await res.json();
          if (Array.isArray(data)) {
            allExercises = [...allExercises, ...data];
          }
        }
      }

      const randomExercises = shuffleArray(allExercises).slice(0, 5);
      setExercises(randomExercises);
      setIsSpinning(true);
    } catch (err) {
      console.error("Failed to fetch exercises", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpinComplete = (exerciseName: string) => {
    const chosen = exercises.find(ex => ex.name === exerciseName);
    if (chosen) {
      setSelectedExercise(chosen);
      setCompletedExercises(prev => [...prev, chosen]);
    }
    setIsSpinning(false);
  };

  useEffect(() => {
    fetchNewExercises();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-122 text-center">
        {loading ? (
          <p className="text-lg font-bold">Loading Wheel...</p>
        ) : isSpinning ? (
          <SpinningWheel
            exercises={exercises.map(ex => ex.name)}
            onComplete={handleSpinComplete}
          />
        ) : (
          <ExerciseDisplay
            exercise={selectedExercise}
            onSpinAgain={fetchNewExercises}
            completedExercises={completedExercises} // ✅ send to display
          />
        )}
      </div>
    </div>
  );
};

export default WorkoutOverlay;
