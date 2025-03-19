"use client";
import { useState, useEffect } from "react";
import FilterButton from "./FilterButtons";

const WORKOUT_TYPES = ["cardio", "olympic_weightlifting", "plyometrics", "powerlifting", "strength", "stretching", "strongman"];
const MUSCLE_GROUPS = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];
const DIFFICULTY_LEVELS = ["beginner", "intermediate", "expert"];

const WorkoutPage = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    if (selectedTypes.length === 0 || selectedMuscles.length === 0 || selectedDifficulty.length === 0) {
      console.warn("User must select at least one filter from each category.");
      return;
    }

    try {
      const typeQuery = `type=${selectedTypes.join(",")}`;
      const muscleQuery = `muscle=${selectedMuscles.join(",")}`;
      const difficultyQuery = `difficulty=${selectedDifficulty.join(",")}`;

      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?${typeQuery}&${muscleQuery}&${difficultyQuery}`,
        {
          headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY! },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch exercises");

      const data = await response.json();
      setExercises(data.slice(0, 5)); // API limit workaround
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  return (
    <section className="bg-gray-1 dark:bg-dark-2 min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold text-dark dark:text-white mb-6">Select Your Workout</h1>

      <div className="w-full max-w-lg bg-white dark:bg-dark-3 shadow-md rounded-lg p-6">
        {/* Filters */}
        <FilterButton options={WORKOUT_TYPES} selected={selectedTypes} setSelected={setSelectedTypes} label="Workout Type" />
        <FilterButton options={MUSCLE_GROUPS} selected={selectedMuscles} setSelected={setSelectedMuscles} label="Target Muscle" />
        <FilterButton options={DIFFICULTY_LEVELS} selected={selectedDifficulty} setSelected={setSelectedDifficulty} label="Difficulty" />

        {/* Fetch Button */}
        <button
          onClick={fetchExercises}
          disabled={selectedTypes.length === 0 || selectedMuscles.length === 0 || selectedDifficulty.length === 0}
          className="mt-4 w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Get Workout
        </button>

        {/* Display Exercises
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">Workout Exercises</h3>
          <ul className="text-body-color dark:text-dark-6">
            {exercises.length > 0 ? (
              exercises.map((exercise, index) => (
                <li key={index} className="border-b py-2">{exercise.name}</li>
              ))
            ) : (
              <p className="text-gray-500">No exercises yet. Select filters and click "Get Workout".</p>
            )}
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default WorkoutPage;
