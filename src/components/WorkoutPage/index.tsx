"use client";
import { useState, useEffect } from "react";

const WorkoutPage = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("https://api.api-ninjas.com/v1/exercises?type=strength", {
          headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY! },
        });

        if (!response.ok) throw new Error("Failed to fetch exercises");

        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <section
      id="workout"
      className="bg-gray-1 dark:bg-dark-2 pb-8 pt-20 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Left Section - Workout Intro */}
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                  Start Your Workout
                </h2>
                <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Select your filters and begin your workout. Exercises will be
                  randomized based on your preferences.
                </p>

                <button className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white duration-300 hover:bg-primary/90">
                  Start Workout
                </button>
              </div>
            </div>

            {/* Right Section - Exercise List */}
            <div className="w-full px-4 lg:w-1/2">
              <div className="bg-white dark:bg-dark-3 shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-dark dark:text-white">
                  Available Exercises
                </h3>
                <ul className="text-body-color dark:text-dark-6">
                  {exercises.length > 0 ? (
                    exercises.map((exercise, index) => (
                      <li key={index} className="border-b py-2">
                        {exercise.name}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">Loading exercises...</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutPage;
