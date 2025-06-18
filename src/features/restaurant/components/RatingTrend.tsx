import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const RatingTrendsChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Restaurant Rating",
              data: [4.1, 4.2, 4.1, 4.3, 4.2, 4.3],
              borderColor: "#00674B",
              backgroundColor: "rgba(0, 103, 75, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              min: 3.5,
              max: 5,
              ticks: { stepSize: 0.5 },
            },
          },
        },
      });
      return () => chart.destroy();
    }
  }, []);

  return <canvas ref={chartRef} className="h-[200px] w-full" />;
};
