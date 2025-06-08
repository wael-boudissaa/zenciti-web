import React from "react";
import Sidebar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import CustomerProfile from "./components/CustomerProfile";
import CustomerOrderHistory from "./components/CustomerOrderHistory";
import FavoriteItems from "./components/FavoriteItems";

const CustomerOrderDetailsPage: React.FC = () => (
    <div className="font-sans bg-gray-100 text-gray-800 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
            <Header />
            <div className="p-6">
                <CustomerProfile />
                <CustomerOrderHistory />
                <FavoriteItems />
            </div>
        </div>
    </div>
);
export default CustomerOrderDetailsPage;

