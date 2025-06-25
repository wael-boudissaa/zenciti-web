import React from "react";
import Header from "../../../components/Header/Header";
import OccupancyChart from "../../../components/Charts/OccupancyChart";
import ReservationList from "../../../components/ReservationList/ReservationList";
import TableAvailability from "../../../components/TableAvailability/TableAvailability";
import Sidebar from "../../../components/SideBar/SideBar";
import ReservationsChart from "../../../components/Charts/ReservationChart";
import StatsCards from "../../../components/StatsCard/StatsCard";
import { useAuth } from "../../../app/context";


const HomePage: React.FC = () => {
    const { idRestaurant } = useAuth();
    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <StatsCards idRestaurant={idRestaurant} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <ReservationsChart idRestaurant={idRestaurant} />
                        <OccupancyChart />
                    </div>
                    <ReservationList idRestaurant={idRestaurant} />
                    <TableAvailability idRestaurant={idRestaurant} />
                </div>
            </div>
        </div>
    );
}
export default HomePage;
