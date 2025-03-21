"use client";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";

interface SpinningWheelProps {
  exercises: string[];
  onComplete: (exercise: string) => void;
}

const SpinningWheel = ({ exercises, onComplete }: SpinningWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (spinning) return;
    const randomIndex = Math.floor(Math.random() * exercises.length);
    setPrizeNumber(randomIndex);
    setSpinning(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-dark dark:text-white mb-4">
        Spin the Wheel!
      </h2>
      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={prizeNumber}
        data={exercises.map((exercise) => ({ option: exercise }))}
        backgroundColors={["#FF5733", "#33FF57", "#3357FF", "#FF33A1"]}
        textColors={["#FFFFFF"]}
        onStopSpinning={() => {
          setSpinning(false);
          onComplete(exercises[prizeNumber]);
        }}
      />
      <button
        className="mt-4 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90"
        onClick={handleSpinClick}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin Now"}
      </button>
    </div>
  );
};

export default SpinningWheel;
