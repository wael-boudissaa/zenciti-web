import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RecentOrder } from "../hooks/hoos_order_page";

interface Props {
    loading: boolean;
    recentOrders: RecentOrder[];
}

const OrdersTable: React.FC<Props> = ({ loading, recentOrders }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const filteredOrders = recentOrders.filter(o =>
        o.idOrder.toLowerCase().includes(search.toLowerCase()) ||
        o.firstName.toLowerCase().includes(search.toLowerCase()) ||
        o.lastName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Recent Orders</h3>
                    <div className="flex space-x-2">
                        <div className="relative">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date &amp; Time</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading
                            ? <tr><td colSpan={7} className="px-6 py-8 text-center">Loading...</td></tr>
                            : filteredOrders.map((o) => (
                                <tr className="hover:bg-gray-50" key={o.idOrder} onClick={() => navigate(`/order/details/${o.idClient}`)}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                        #{o.idOrder.slice(0, 8).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{o.firstName} {o.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(o.createdAt).toLocaleDateString()}<br />
                                        <span className="text-gray-500">{new Date(o.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                            {o.itemCount} item{o.itemCount > 1 ? "s" : ""}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        ${o.totalPrice.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${o.status === "pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : o.status === "completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : o.status === "cancelled"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-gray-100 text-gray-800"
                                            }`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;
