import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";

interface SpinningWheelProps {
  exercises: string[];
  onComplete: (exercise: string) => void;
}

const SpinningWheel = ({ exercises, onComplete }: SpinningWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [wheelData, setWheelData] = useState<{ option: string }[]>([]);

  useEffect(() => {
    if (exercises.length > 0) {
      setWheelData(exercises.map(exercise => ({ option: exercise })));
    }
  }, [exercises]); // Update wheel when new exercises arrive

  const handleSpinClick = () => {
    if (spinning || wheelData.length === 0) return;
    const randomIndex = Math.floor(Math.random() * wheelData.length);
    setPrizeNumber(randomIndex);
    setSpinning(true);
  };

  if (wheelData.length === 0) {
    return <p className="text-lg font-bold">Loading Wheel...</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-dark dark:text-white mb-4">
        Spin the Wheel!
      </h2>
      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={prizeNumber}
        data={wheelData}
        backgroundColors={["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FF33A2"]}
        textColors={["#FFFFFF"]}
        onStopSpinning={() => {
          setSpinning(false);
          onComplete(wheelData[prizeNumber].option);
        }}
      />
      <button
        className="mt-4 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90"
        onClick={handleSpinClick}
        disabled={spinning || wheelData.length === 0}
      >
        {spinning ? "Spinning..." : "Spin Now"}
      </button>
    </div>
  );
};

export default SpinningWheel;
