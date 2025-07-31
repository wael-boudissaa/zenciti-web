import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import type { MonthlyRatingStats } from "../hooks/hooks";

// Helper to get last 12 months as {label, month, year}
function getLast12Months(): { label: string; month: number; year: number }[] {
  const now = new Date();
  const months: { label: string; month: number; year: number }[] = [];
  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: `${MONTHS[d.getMonth()]} '${String(d.getFullYear()).slice(-2)}`,
      month: d.getMonth() + 1, // JS month is 0-based
      year: d.getFullYear(),
    });
  }
  return months;
}

type RatingTrendsChartProps = {
  stats: MonthlyRatingStats[];
};

export const RatingTrendsChart: React.FC<RatingTrendsChartProps> = ({ stats }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const months = getLast12Months();

    // Map stats by year+month for easy lookup
    const statMap = new Map<string, MonthlyRatingStats>();
    stats.forEach((s) => statMap.set(`${s.year}-${s.month}`, s));

    const labels = months.map((m) => m.label);
    const data = months.map(({ year, month }) => {
      const stat = statMap.get(`${year}-${month}`);
      if (stat && stat.totalRatings > 0) return stat.averageRating;
      return 0; // Default for missing months
    });

    // If chart already exists, destroy before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Restaurant Rating",
            data,
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
            min: 1,
            max: 5,
            ticks: { stepSize: 0.5 },
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [stats]);

  return <canvas ref={chartRef} className="h-[200px] w-full" />;
};
