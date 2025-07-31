import { useState } from "react";
import { useAuth } from "../../app/context";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import ReservationFilters, { type FilterState } from "./components/ReservationFilters";
import ReservationTable from "./components/ReservationTable";
import UpcomingReservations from "./components/UpComingReservation";

export default function ReservationsPage() {
    const { idRestaurant } = useAuth();
    const [filters, setFilters] = useState<FilterState>();

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <ReservationFilters onFiltersChange={handleFiltersChange} />
                    <ReservationTable idRestaurant={idRestaurant} filters={filters} />
                    <UpcomingReservations idRestaurant={idRestaurant} />
                </div>
            </div>
        </div>
    );
}
