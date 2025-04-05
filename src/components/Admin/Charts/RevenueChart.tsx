"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"
import { useEffect, useState } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface RevenueChartProps {
  payments: {
    amount: number;
    createdAt: Date;
  }[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ payments }) => {
  const [monthlyTotals, setMonthlyTotals] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const totals: { [key: string]: number } = {}

    payments.forEach((payment) => {
      const date = new Date(payment.createdAt)
      const key = date.toLocaleString("default", { month: "short", year: "numeric" })
      totals[key] = (totals[key] || 0) + payment.amount
    })

    setMonthlyTotals(totals)
  }, [payments])

  const labels = Object.keys(monthlyTotals).slice(-6)
  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: labels.map((label) => monthlyTotals[label]),
        backgroundColor: "rgba(59, 130, 246, 0.5)", // blue-500/50
        borderColor: "rgba(29, 78, 216, 1)", // blue-700
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#374151", // gray-700
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6B7280", // gray-500
        },
        grid: {
          color: "#E5E7EB", // gray-200
        },
      },
      y: {
        ticks: {
          color: "#6B7280",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
    },
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200 text-center">
        Monthly Revenue
      </h3>
      <Bar data={data} options={options} />
    </div>
  )
}

export default RevenueChart
