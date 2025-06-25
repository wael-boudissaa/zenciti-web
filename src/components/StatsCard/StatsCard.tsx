import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUtensils, faCalendarCheck, faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { getDashboardCount } from "../../features/dashboard/hooks/hooks_reservation";


const StatsCards: React.FC<{ idRestaurant: string }> = ({ idRestaurant }) => {
    const [orderCount, setOrderCount] = React.useState(0);
    const [reservationCount, setReservationCount] = React.useState(0);
    const [firstTimeUsers, setFirstTimeUsers] = React.useState(0);
    // count[loading, setLoading] = React.useState(true);
    // count[error, setError] = React.useState<string | null>(null);
    //
    useEffect(() => {
        const fetchData = async () => {
            const result = await getDashboardCount(idRestaurant)
            if (result) {
                setOrderCount(result.numberOrders);
                setReservationCount(result.numberReservation);
                setFirstTimeUsers(result.firstTimeUsers);
            } else {
                console.error("Failed to fetch dashboard count");
            }
        };

        fetchData();
    }, [idRestaurant]);
    const stats = [
        {
            icon: faUtensils,
            label: "Total orders received",
            value: orderCount,
            goal: 300,
            goalLabel: "orders",
            progress: 80,
            time: "Today",
        },
        {
            icon: faCalendarCheck,
            label: "Total reservations today",
            value: reservationCount,
            goal: 300,
            goalLabel: "reservations",
            progress: 80,
            time: "Today",
        },
        {
            icon: faUsers,
            label: "New customers this month",
            value: firstTimeUsers,
            goal: 500,
            goalLabel: "customers",
            progress: 70,
            time: "This Month",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-light rounded-lg p-3">
                            <FontAwesomeIcon icon={stat.icon} className="text-green-900 text-xl" />
                        </div>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{stat.time}</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-1">{stat.value}</h2>
                    <p className="text-gray-600 mb-4">{stat.label}</p>
                    <div className="mt-auto">
                        <p className="text-sm font-medium mb-2">Goal: {stat.goal} {stat.goalLabel}</p>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-green-900 h-full rounded-full" style={{ width: `${(stat.value * 100) / stat.goal}%` }}></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatsCards;
