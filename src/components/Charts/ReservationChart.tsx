import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend } from "chart.js";
import { getReservationLastMonth } from "../../features/dashboard/hooks/hooks_reservation";
import type { ReservationLastMonth } from "../../features/dashboard/hooks/hooks_reservation";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            grid: { drawBorder: false },
        },
        x: {
            grid: { display: false },
        },
    },
    plugins: { legend: { display: false } },
};

function formatDayLabel(dateStr: string, mode: "7" | "30") {
    const date = new Date(dateStr);
    if (mode === "7") {
        // Weekday short (Mon, Tue, ...)
        return date.toLocaleDateString(undefined, { weekday: "short" });
    }
    // Day of month (e.g., "8" for June 8)
    return date.getDate().toString();
}

const ReservationsChart: React.FC<{ idRestaurant: string }> = ({ idRestaurant }) => {
    const [period, setPeriod] = useState<"7" | "30">("7");
    const [chartData, setChartData] = useState<ReservationLastMonth>({
         labels: [],
        datasets: [
            {
                label: "Reservations",
                data: [],
                fill: true,
                backgroundColor: "rgba(0, 103, 75, 0.1)",
                borderColor: "#00674B",
                tension: 0.4,
                pointBackgroundColor: "#00674B",
                pointBorderColor: "#fff",
                pointRadius: 4,
            },
        ],
    });

    useEffect(() => {
        let isMounted = true;
        getReservationLastMonth(idRestaurant).then((result) => {
            const now = new Date();
            const daysBack = period === "7" ? 7 : 30;

            // Build a map for fast lookup
            const resMap = new Map(result.map(item => [item.day.slice(0, 10), item.reservations]));

            // Compute the last N days
            const labels: string[] = [];
            const data: number[] = [];
            for (let i = daysBack - 1; i >= 0; i--) {
                const d = new Date(now);
                d.setDate(now.getDate() - i);
                const key = d.toISOString().slice(0, 10); // "YYYY-MM-DD"
                labels.push(formatDayLabel(d.toISOString(), period));
                data.push(resMap.get(key) || 0);
            }

            if (isMounted) {
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Reservations",
                            data,
                            fill: true,
                            backgroundColor: "rgba(0, 103, 75, 0.1)",
                            borderColor: "#00674B",
                            tension: 0.4,
                            pointBackgroundColor: "#00674B",
                            pointBorderColor: "#fff",
                            pointRadius: 4,
                        },
                    ],
                });
            }
        });
        return () => { isMounted = false; };
    }, [idRestaurant, period]);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Reservations Overview</h3>
                <select
                    className="text-sm border rounded-lg px-3 py-2 bg-gray-50"
                    value={period}
                    onChange={e => setPeriod(e.target.value as "7" | "30")}
                >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                </select>
            </div>
            <div className="h-[300px]">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
export default ReservationsChart;
