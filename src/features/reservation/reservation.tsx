import { useAuth } from "../../app/context";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import ReservationFilters from "./components/ReservationFilters";
import ReservationStats from "./components/ReservationStats";
import ReservationTable from "./components/ReservationTable";
import UpcomingReservations from "./components/UpComingReservation";

export default function ReservationsPage() {
    const { idRestaurant } = useAuth()
    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <ReservationStats />
                    <ReservationFilters />
                    <ReservationTable idRestaurant={idRestaurant} />
                    <UpcomingReservations idRestaurant={idRestaurant} />
                </div>
            </div>
        </div>
    );
}
