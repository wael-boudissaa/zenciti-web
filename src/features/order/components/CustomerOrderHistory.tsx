import React from "react";
import { useNavigate } from "react-router-dom";

type FoodItem = {
    name: string;
    priceSingle: number;
    quantity: number;
};

type Order = {
    idOrder: string;
    createdAt: string;
    status: string;
    foodItems: FoodItem[];
    totalPrice: number;
};

interface CustomerOrderHistoryProps {
    orders: Order[];
}

const statusMap: Record<string, { text: string; statusClass: string }> = {
    pending: { text: "Pending", statusClass: "bg-yellow-100 text-yellow-800" },
    completed: { text: "Completed", statusClass: "bg-green-100 text-green-800" },
    cancelled: { text: "Cancelled", statusClass: "bg-red-100 text-red-800" },
    processing: { text: "Processing", statusClass: "bg-yellow-100 text-yellow-800" },
};

const CustomerOrderHistory: React.FC<CustomerOrderHistoryProps> = ({ orders }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Order History</h3>
                    <div className="flex space-x-2">
                        <div className="relative">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64" />
                        </div>
                        <select className="text-sm border rounded-lg px-3 py-2 bg-gray-50">
                            <option>All Orders</option>
                            <option>Completed</option>
                            <option>Processing</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date &amp; Time</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((o) => (
                            <tr className="hover:bg-gray-50" key={o.idOrder} onClick={() => { navigate(`/order/customer/${o.idOrder}`) }}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-medium">#{o.idOrder.slice(0, 8).toUpperCase()}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {(new Date(o.createdAt)).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    <br />
                                    <span className="text-gray-500">{(new Date(o.createdAt)).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                </td>
                                <td className="px-6 py-4">
                                    {o.foodItems.map((item, idx) => (
                                        <div key={idx} className={idx > 0 ? "mt-2" : ""}>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.quantity}x ${item.priceSingle}
                                            </p>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    ${o.totalPrice.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full ${statusMap[o.status]?.statusClass || "bg-gray-200 text-gray-800"}`}>{statusMap[o.status]?.text || o.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination can be implemented here */}
        </div>
    );
}

export default CustomerOrderHistory;
