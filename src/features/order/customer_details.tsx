import React from "react";
import Sidebar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import OrderSummary from "./components/OrderSummary";
import OrderItems from "./components/OrderItems";
import OrderTimeline from "./components/OrderTimeLine";
import OrderActions from "./components/OrderAction";

const CustomerDetailsPage: React.FC = () => (
    <div className="font-sans bg-gray-100 text-gray-800 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
            <Header />
            <div className="p-6">
                <div className="flex mb-6">
                    <span className="flex items-center text-green-900 hover:underline cursor-pointer">
                        <i className="fa-solid fa-arrow-left mr-2"></i>
                        <span>Back to orders</span>
                    </span>
                </div>
                <OrderSummary />
                <OrderItems />
                <OrderTimeline />
                <OrderActions />
            </div>
        </div>
    </div>
);

export default CustomerDetailsPage;
