"use client";
import { useState } from "react";
import FilterButton from "./FilterButtons";
import WorkoutOverlay from "./WorkoutOverlay";

const WORKOUT_TYPES = [
  "cardio",
  "olympic_weightlifting",
  "plyometrics",
  "powerlifting",
  "strength",
  "stretching",
  "strongman",
];
const MUSCLE_GROUPS = [
  "abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes",
  "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"
];

interface Exercise {
  name: string;
  type: string;
  muscle: string;
  difficulty: string;
  instructions: string;
}

const WorkoutPage = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const shuffleArray = (array: Exercise[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleBeginWorkout = async () => {
    if (!selectedTypes.length || !selectedMuscles.length) {
      alert("Please select at least one option from each category.");
      return;
    }

    setLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_API_NINJAS_KEY!;
      let allExercises: Exercise[] = [];

      for (const muscle of selectedMuscles) {
        for (const type of selectedTypes) {
          const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=${type}&difficulty=beginner`;

          const response = await fetch(url, {
            headers: { "X-Api-Key": apiKey },
          });

          const text = await response.text();
          console.log(`API Response for ${muscle} - ${type}:`, text);

          let data;
          try {
            data = JSON.parse(text);
          } catch (error) {
            console.error("Invalid JSON from API:", text);
            throw new Error("Invalid JSON received from API.");
          }

          if (Array.isArray(data)) {
            allExercises = [...allExercises, ...data];
          }
        }
      }

      if (allExercises.length === 0) {
        throw new Error("No exercises found. Try different filters.");
      }

      setExercises(shuffleArray(allExercises).slice(0, 5));
      setIsWorkoutActive(true);
    } catch (error: any) {
      console.error("Error fetching exercises:", error);
      alert(error.message || "Failed to fetch exercises");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-1 dark:bg-dark-2 min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-6">Select Your Workout</h1>

      <div className="w-full max-w-lg bg-white dark:bg-dark-3 shadow-md rounded-lg p-6">
        {/* Filters */}
        <FilterButton
          options={WORKOUT_TYPES}
          selected={selectedTypes}
          setSelected={setSelectedTypes}
          label="Workout Type"
        />
        <FilterButton
          options={MUSCLE_GROUPS}
          selected={selectedMuscles}
          setSelected={setSelectedMuscles}
          label="Target Muscle"
        />

        {/* Start Workout Button */}
        {selectedTypes.length > 0 && selectedMuscles.length > 0 && (
          <button
            onClick={handleBeginWorkout}
            disabled={loading}
            className="mt-4 w-full bg-secondary text-white px-6 py-3 rounded-md hover:bg-secondary/90 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Fetching..." : "Begin Workout"}
          </button>
        )}
      </div>

      {isWorkoutActive && (
      <WorkoutOverlay
        selectedMuscles={selectedMuscles}
        selectedTypes={selectedTypes}
        onClose={(completedExercises) => {
          console.log("Completed workout:", completedExercises);
          setIsWorkoutActive(false);
    }}
  />
)}

    </section>
  );
};

export default WorkoutPage;
