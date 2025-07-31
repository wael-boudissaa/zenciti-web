import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import type { HourlyStats, StatusStats } from "../hooks/hoos_order_page";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  loading: boolean;
  hourlyStats?: HourlyStats;
  statusStats?: StatusStats;
}

const hours = [
  "8", "9", "10", "11", "12", "13", "14", "15",
  "16", "17", "18", "19", "20", "21", "22", "23"
];

const COLORS: Record<string, string> = {
  completed: "#022c22",
  pending: "#F59E0B",
  cancelled: "#EF4444",
  default: "#3B82F6",
};

const OrderAnalytics: React.FC<Props> = ({ loading, hourlyStats, statusStats }) => {
  const maxCount = Math.max(...hours.map(h => hourlyStats?.[h] || 0), 1);

  const statusLabels = statusStats ? Object.keys(statusStats) : [];
  const statusValues = statusStats ? Object.values(statusStats) : [];
  const backgroundColors = statusLabels.map((status) => COLORS[status] || COLORS.default);

  const doughnutData = {
    labels: statusLabels.map((status) => status.charAt(0).toUpperCase() + status.slice(1)),
    datasets: [
      {
        data: statusValues,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Hourly Order Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Order Overview</h3>
        </div>
        <div className="h-[300px] flex flex-col justify-end items-center">
          <div className="w-full flex items-end h-40">
            {hours.map((h) => {
              const value = hourlyStats?.[h] || 0;
              return (
                <div
                  key={h}
                  className="flex-1 mx-1 bg-primary rounded"
                  style={{ height: `${(value / maxCount) * 100}%`, minHeight: 2 }}
                  title={`${h}:00 - ${value} orders`}
                ></div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 w-full mt-2">
            {hours.map((h, i) =>
              <span key={h} className={i % 2 === 0 ? "" : "opacity-0"}>{h}:00</span>
            )}
          </div>
        </div>
      </div>

      {/* Order Status Distribution (Doughnut Chart) */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Order Distribution</h3>
          <select className="text-sm border rounded-lg px-3 py-2 bg-gray-50">
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
          </select>
        </div>
        <div className="h-[300px]">
          {statusStats ? (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          ) : (
            <p className="text-gray-400 text-sm text-center mt-24">No status data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderAnalytics;

