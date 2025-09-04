import React, { useEffect, useState } from "react";
import { useAuth } from "../../app/context";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import ReservationStats from "./components/ReservationStats";
import ReservationAnalytics from "./components/ReservationAnalytics";
import ReservationFilters, { type FilterState } from "./components/ReservationFilters";
import ReservationTable from "./components/ReservationTable";
import UpcomingReservations from "./components/UpComingReservation";
import { getRestaurantReservationAnalytics, type ReservationAnalyticsResponse } from "./hooks/hook_reservation_stats";

export default function ReservationsPage() {
    const { idRestaurant } = useAuth();
    const [filters, setFilters] = useState<FilterState>();
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState<ReservationAnalyticsResponse | null>(null);

    useEffect(() => {
        async function fetchAnalytics() {
            if (!idRestaurant) return;
            
            setLoading(true);
            try {
                const response = await getRestaurantReservationAnalytics(idRestaurant);
                if (response) {
                    setAnalytics(response);
                } else {
                    console.error("Failed to fetch reservation analytics");
                }
            } catch (e) {
                console.error("Error fetching reservation analytics:", e);
            }
            setLoading(false);
        }
        fetchAnalytics();
    }, [idRestaurant]);

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <ReservationStats loading={loading} idRestaurant={idRestaurant} />
                    <ReservationAnalytics loading={loading} hourlyStats={analytics?.hourlyStats} statusStats={analytics?.statusStats} />
                    {/* <ReservationFilters onFiltersChange={handleFiltersChange} /> */}
                    <ReservationTable idRestaurant={idRestaurant} filters={filters} />
                    <UpcomingReservations idRestaurant={idRestaurant} />
                </div>
            </div>
        </div>
    );
}
