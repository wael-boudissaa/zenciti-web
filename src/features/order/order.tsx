import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import OrderStats from "./components/OrderStats";
import OrderAnalytics from "./components/OrderAnalytics";
import OrdersTable from "./components/OrderTables";
import PopularItems from "./components/PopulaireItems";
import { getRestaurantOrderInformation, type OrdersStatsResponse } from "./hooks/hoos_order_page";
import { useAuth } from "../../app/context";
import Sidebar from "../../components/SideBar/SideBar";

const OrdersPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<OrdersStatsResponse | null>(null);
    const { idRestaurant } = useAuth();

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            try {
                const response = await getRestaurantOrderInformation(idRestaurant);
                if (response) {
                    setStats(response);
                } else {
                    console.error("Failed to fetch order stats");
                }

            } catch (e) {
                console.error("Error fetching order stats:", e);
            }
            setLoading(false);
        }
        fetchStats();
    }, []);
    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <OrderStats loading={loading} statusStats={stats?.statusStats} />
                    {/* <OrderAnalytics loading={loading} hourlyStats={stats?.hourlyStats} statusStats={stats?.statusStats} /> */}
                    <OrdersTable loading={loading} recentOrders={stats?.recentOrders || []} />
                    <PopularItems idRestaurant={idRestaurant} />
                </div>
            </div>
        </div>
    );
}

export default OrdersPage;
