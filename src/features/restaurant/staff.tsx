
import React from "react";
import Sidebar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import { RestaurantTabs } from "./components/RestaurantTables";

export const StaffPage: React.FC = () => {
    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <RestaurantTabs selected="Staff" />
                </div>
            </div>
        </div>
    );
}
// export default SatffPage;
