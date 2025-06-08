import React from "react";
import { useNavigate } from "react-router-dom";

const orders = [
    {
        id: "#ORD-7256",
        date: "June 7, 2023",
        time: "12:42 PM",
        items: [
            { name: "Grilled Salmon", qty: 2, price: "$24.99" },
            { name: "Caesar Salad", qty: 1, price: "$12.50" },
            { name: "Chocolate Lava Cake", qty: 1, price: "$8.99" },
        ],
        total: "$68.50",
        status: "Processing",
        statusClass: "bg-yellow-100 text-yellow-800",
    },
    {
        id: "#ORD-7234",
        date: "June 2, 2023",
        time: "7:15 PM",
        items: [
            { name: "Beef Burger", qty: 1, price: "$15.99" },
            { name: "French Fries", qty: 1, price: "$4.50" },
            { name: "Soda", qty: 1, price: "$2.99" },
        ],
        total: "$23.48",
        status: "Completed",
        statusClass: "bg-green-100 text-green-800",
    },
    {
        id: "#ORD-7209",
        date: "May 28, 2023",
        time: "1:30 PM",
        items: [
            { name: "Margherita Pizza", qty: 1, price: "$14.99" },
            { name: "Garlic Bread", qty: 1, price: "$5.50" },
            { name: "Tiramisu", qty: 1, price: "$7.99" },
        ],
        total: "$28.48",
        status: "Completed",
        statusClass: "bg-green-100 text-green-800",
    },
    {
        id: "#ORD-7198",
        date: "May 25, 2023",
        time: "6:45 PM",
        items: [
            { name: "Pasta Carbonara", qty: 1, price: "$16.99" },
            { name: "Bruschetta", qty: 1, price: "$7.50" },
            { name: "Lemonade", qty: 1, price: "$3.99" },
        ],
        total: "$28.48",
        status: "Cancelled",
        statusClass: "bg-red-100 text-red-800",
    },
];
const CustomerOrderHistory: React.FC = () => {
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
                            <tr className="hover:bg-gray-50" key={o.id} onClick={() => navigate("/order/customer")}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-medium">{o.id}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {o.date}
                                    <br />
                                    <span className="text-gray-500">{o.time}</span>
                                </td>
                                <td className="px-6 py-4">
                                    {o.items.map((item, idx) => (
                                        <div key={idx} className={idx > 0 ? "mt-2" : ""}>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.qty}x {item.price}
                                            </p>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {o.total}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full ${o.statusClass}`}>{o.status}</span>
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
            <div className="px-6 py-4 border-t flex items-center justify-between">
                <p className="text-sm text-gray-600">Showing 4 of 24 orders</p>
                <div className="flex space-x-1">
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">
                        <i className="fa-solid fa-chevron-left text-xs"></i>
                    </button>
                    <button className="px-3 py-1 rounded bg-green-900 text-white">1</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">2</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">3</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">
                        <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomerOrderHistory;
