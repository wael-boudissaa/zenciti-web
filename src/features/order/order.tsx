import React from "react";
import Sidebar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import OrderStats from "./components/OrderStats";
import OrderAnalytics from "./components/OrderAnalytics";
import OrdersTable from "./components/OrderTables";
import PopularItems from "./components/PopulaireItems";

const OrdersPage: React.FC = () => (
    <div className="font-sans bg-gray-100 text-gray-800 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
            <Header />
            <div className="p-6">
                <OrderStats />
                <OrderAnalytics />
                <OrdersTable />
                <PopularItems />
            </div>
        </div>
    </div>
);

export default OrdersPage;
