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
    amount: number
    createdAt: string
  }[]
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

  const labels = Object.keys(monthlyTotals).slice(-6) // Last 6 months
  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: labels.map((label) => monthlyTotals[label]),
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
    },
  }

  return (
    <div className="w-full md:w-1/2 p-4">
      <h3 className="mb-2 text-center font-semibold">Monthly Revenue</h3>
      <Bar data={data} options={options} />
    </div>
  )
}

export default RevenueChart
