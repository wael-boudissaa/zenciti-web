import React from "react";
import Header from "../../../components/Header/Header";
import OccupancyChart from "../../../components/Charts/OccupancyChart";
import ReservationList from "../../../components/ReservationList/ReservationList";
import TableAvailability from "../../../components/TableAvailability/TableAvailability";
import Sidebar from "../../../components/SideBar/SideBar";
import ReservationsChart from "../../../components/Charts/ReservationChart";
import StatsCards from "../../../components/StatsCard/StatsCard";


const HomePage: React.FC = () => (
    <div className="font-sans bg-gray-100 text-gray-800 flex min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
            <Header />
            <div className="p-6">
                <StatsCards idRestaurant="d1c2b3a4-5e6f-7a8b-9c0d-1e2f3a4b5c7e" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <ReservationsChart idRestaurant="c3b2a1d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d" />
                    <OccupancyChart />
                </div>
                <ReservationList idRestaurant="d1c2b3a4-5e6f-7a8b-9c0d-1e2f3a4b5c7e" />
                <TableAvailability />
            </div>
        </div>
    </div>
);

export default HomePage;
