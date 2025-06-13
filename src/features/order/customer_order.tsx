import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import CustomerProfile from "./components/CustomerProfile";
import CustomerOrderHistory from "./components/CustomerOrderHistory";
import FavoriteItems from "./components/FavoriteItems";
import { getCustomerOrderInformation, type Order, type Profile } from "./hooks/hook_order";

const CustomerOrderDetailsPage: React.FC = () => {
    const { idClient } = useParams<{ idClient: string }>();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalSpent, setTotalSpent] = useState<number>(0);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [firstOrderDate, setFirstOrderDate] = useState<string>("");

    useEffect(() => {
        if (!idClient) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getCustomerOrderInformation(idClient);
                if (response) {
                    setProfile(response.Profile);
                    setOrders(response.Orders);
                    setTotalSpent(response.TotalSpent);
                    setTotalOrders(response.TotalOrders);
                    setFirstOrderDate(response.FirstOrderDate);
                }
            } catch (e) {
                console.error("Error fetching customer order details:", e);
            }
            setLoading(false);
        };
        fetchData();
    }, [idClient]);

    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    {loading && <div className="mb-8">Loading...</div>}
                    {!loading && profile && (
                        <>
                            <CustomerProfile
                                profile={profile}
                                totalOrders={totalOrders}
                                totalSpent={totalSpent}
                                firstOrderDate={firstOrderDate}
                            />
                            <CustomerOrderHistory orders={orders} />
                            <FavoriteItems />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerOrderDetailsPage;
