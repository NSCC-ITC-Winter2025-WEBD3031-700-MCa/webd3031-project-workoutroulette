"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserTypeChartProps {
  premiumCount: number;
  freeCount: number;
}

export default function UserTypeChart({ premiumCount, freeCount }: UserTypeChartProps) {
  const data = {
    labels: ["Premium", "Free"],
    datasets: [
      {
        label: "# of Users",
        data: [premiumCount, freeCount],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
        borderColor: ["#1d4ed8", "#9ca3af"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
        Users: Premium vs Free
      </h3>
      <Doughnut data={data} />
    </div>
  );
}
