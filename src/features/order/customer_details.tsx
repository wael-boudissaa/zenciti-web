import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import OrderSummary from "./components/OrderSummary";
import OrderItems from "./components/OrderItems";
import OrderActions from "./components/OrderAction";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "./hooks/hook_order";
import type { FoodItems, OrderInformation } from "./hooks/hook_order";

const CustomerDetailsPage: React.FC = () => {
    const { idOrder } = useParams<{ idOrder: string }>();
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState<OrderInformation | null>(null);
    const [foodOrders, setFoodOrders] = useState<FoodItems[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (!idOrder) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getOrderDetails(idOrder);
                if (response) {
                    setOrderDetails(response);
                    setFoodOrders(response.foodItems || []);
                }
            } catch (e) {
                console.error("Error fetching customer order details:", e);
            }
            setLoading(false);
        };
        fetchData();
    }, [idOrder]);

    if (!idOrder) {
        return <div className="p-6">Order ID is missing</div>;
    }

    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <div className="flex mb-6">
                        <span className="flex items-center text-green-900 hover:underline cursor-pointer" onClick={() => navigate(-1)}>
                            <i className="fa-solid fa-arrow-left mr-2"></i>
                            <span>Back to orders</span>
                        </span>
                    </div>
                    <OrderSummary order={orderDetails} loading={loading} />
                    <OrderItems items={foodOrders} />
                    <OrderActions idOrder={orderDetails?.idOrder ?? ""}
                        currentStatus={orderDetails?.status ?? ""}
                        onStatusChange={(newStatus) => setOrderDetails(o => o ? { ...o, status: newStatus } : o)} />
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailsPage;
