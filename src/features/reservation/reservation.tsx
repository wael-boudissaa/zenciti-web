import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import QuickActionsSection from "./components/QuickActionSection";
import ReservationFilters from "./components/ReservationFilters";
import ReservationStats from "./components/ReservationStats";
import ReservationTable from "./components/ReservationTable";
import UpcomingReservations from "./components/UpComingReservation";

export default function ReservationsPage() {
  return (
    <div className="font-sans bg-gray-100 text-gray-800 flex">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <ReservationStats />
          <ReservationFilters />
          <ReservationTable />
          <UpcomingReservations />
          <QuickActionsSection />
        </div>
      </div>
    </div>
  );
}
