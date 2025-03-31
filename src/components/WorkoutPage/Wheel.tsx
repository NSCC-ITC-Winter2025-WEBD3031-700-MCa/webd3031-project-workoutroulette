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
  const [spinsUsed, setSpinsUsed] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  // 🆕 Store spin reset date from backend
  const [spinResetDate, setSpinResetDate] = useState<string | null>(null);

  useEffect(() => {
    if (exercises.length > 0) {
      setWheelData(exercises.map(exercise => ({ option: exercise })));
    }
  }, [exercises]); // Update wheel when new exercises arrive

  //////////////////////////////////////////////////////////////

  const handleSpinClick = async () => {
    if (spinning || wheelData.length === 0) return;

    try {
      const res = await fetch('/api/spin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exercises }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Something went wrong.');
        return;
      }

      // Remove "Your workout is:" and match with wheelData
      const result = data.workout.replace("Your workout is: ", "").trim();
      const index = wheelData.findIndex(item => item.option === result);

      if (index === -1) {
        alert(`Workout "${result}" not found on the wheel.`);
        return;
      }

      setPrizeNumber(index);
      setSpinning(true);
      setIsPremium(data.isPremium);
      setSpinsUsed(data.spinsUsed);

      // 🆕 Save reset date from backend response
      setSpinResetDate(data.spinResetDate || null);

    } catch (error) {
      console.error(error);
      alert('Failed to spin. Please try again.');
    }
  };

  ////////////////////////////////////////////////////////////////

  if (wheelData.length === 0) {
    return <p className="text-lg font-bold">Loading Wheel...</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-dark mb-4">
        Spin the wheel!
      </h2>

      {/*  Show spins remaining for non-premium users */}
      {!isPremium && spinsUsed !== null && spinsUsed <= 3 && (
        <p className="text-sm text-gray-600 mb-2">
          Spins Remaining: {20 - spinsUsed}
        </p>
      )}

      {/*  Show spin reset date if available and not premium */}
      {!isPremium && spinResetDate && (
        <p className="text-xs text-gray-500 mb-4">
          Spins reset on: {new Date(spinResetDate).toLocaleString()}
        </p>
      )}

      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={prizeNumber}
        data={wheelData}
        fontSize={16}
        backgroundColors={["#2e4a85", "#29265c", "#69cafa", "#b4cafa", "#315382"]}
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
