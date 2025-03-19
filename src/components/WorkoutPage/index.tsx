// This will be the workout selection page 
// Steps:
/*
1. 
A) User must be signed in {ProtectedRoute} 
    - Hard difficulty workouts will be locked for free users
B) User selects workout difficulty and types of workout (strength, cardio etc.) Provided from api workout categories, can be selected by buttons/cards (select/unselect)
C) Click workout to open ui
 
2. POPUP UI (https://stackoverflow.com/questions/65460085/open-a-page-in-a-next-js-website-as-an-overlay) similar to this
    -- Popup ui overlay will be steps/mini pages: 
    -- First Page: Wheel spin
    -- Second Page: Workout display
A) Provides random exercise based on specification (Displays workout and )
B) User works out, can choose to complete workout or do an other exercise
    - Selecting continue workout will spin another workout 
*/


import { useState } from "react";
// import WorkoutWheel from "../WorkoutWheel";
// import WorkoutDetails from "../WorkoutDetails";

const WorkoutPage = () => {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
//   const [selectedWorkout, setSelectedWorkout] = useState(null);
  
  const startWorkout = () => {
    setIsWorkoutActive(true);
  };

//   const finishWorkout = () => {
//     setIsWorkoutActive(false);
//     setSelectedWorkout(null);
//   };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Start Your Workout</h1>
      {!isWorkoutActive ? (
        <div className="text-center mt-6">
          <button
            onClick={startWorkout}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Start Workout
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 max-w-lg">
            {/* {selectedWorkout ? (
              <WorkoutDetails 
                workout={selectedWorkout} 
                onFinish={finishWorkout} 
              />
            ) : (
              <WorkoutWheel onSelectWorkout={setSelectedWorkout} />
            )} */}
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkoutPage;
 

