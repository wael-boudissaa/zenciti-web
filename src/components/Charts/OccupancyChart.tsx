import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Reserved", "Available", "Maintenance"],
  datasets: [
    {
      data: [60, 30, 10],
      backgroundColor: ["#00674B", "#00A67E", "#F59E0B"],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: { padding: 20, boxWidth: 12 },
    },
  },
  cutout: "70%",
};

const OccupancyChart: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-lg">Table Occupancy</h3>
      <select className="text-sm border rounded-lg px-3 py-2 bg-gray-50">
        <option>Today</option>
        <option>Yesterday</option>
        <option>This Week</option>
      </select>
    </div>
    <div className="h-[300px]">
      <Doughnut data={data} options={options} />
    </div>
  </div>
);

export default OccupancyChart;
