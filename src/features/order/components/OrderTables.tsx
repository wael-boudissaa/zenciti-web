import React from "react";
import { useNavigate } from "react-router-dom";

const orders = [
    {
        id: "#ORD-7256",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
        customer: "Lindsey Stroud",
        date: "June 7, 2023",
        time: "12:42 PM",
        items: "5 items",
        total: "$68.50",
        status: "Processing",
        statusClass: "bg-yellow-100 text-yellow-800",
        viewDisabled: false,
        completeDisabled: false,
        cancelDisabled: false,
    },
    {
        id: "#ORD-7255",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
        customer: "Michael Owen",
        date: "June 7, 2023",
        time: "12:15 PM",
        items: "3 items",
        total: "$42.75",
        status: "Completed",
        statusClass: "bg-green-100 text-green-800",
        viewDisabled: false,
        completeDisabled: true,
        cancelDisabled: true,
    },
    {
        id: "#ORD-7254",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
        customer: "Sarah Brown",
        date: "June 7, 2023",
        time: "11:50 AM",
        items: "2 items",
        total: "$29.99",
        status: "Completed",
        statusClass: "bg-green-100 text-green-800",
        viewDisabled: false,
        completeDisabled: true,
        cancelDisabled: true,
    },
    {
        id: "#ORD-7253",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
        customer: "Mary Jane",
        date: "June 7, 2023",
        time: "11:32 AM",
        items: "4 items",
        total: "$54.25",
        status: "Preparing",
        statusClass: "bg-blue-100 text-blue-800",
        viewDisabled: false,
        completeDisabled: false,
        cancelDisabled: false,
    },
    {
        id: "#ORD-7252",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
        customer: "Peter Dodle",
        date: "June 7, 2023",
        time: "11:05 AM",
        items: "1 item",
        total: "$18.50",
        status: "Cancelled",
        statusClass: "bg-red-100 text-red-800",
        viewDisabled: false,
        completeDisabled: true,
        cancelDisabled: true,
    },
];

const OrdersTable: React.FC = () => {

    const navigate = useNavigate();
    return (<div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Recent Orders</h3>
                <div className="flex space-x-2">
                    <div className="relative">
                        <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64" />
                    </div>
                    <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center">
                        <i className="fa-solid fa-filter mr-2"></i>
                        Filter
                    </button>
                    <button className="text-sm bg-green-900 text-white hover:bg-green-900/90 px-4 py-2 rounded-lg flex items-center">
                        <i className="fa-solid fa-plus mr-2"></i>
                        New Order
                    </button>
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
                <tbody className="divide-y divide-gray-200" >

                    {orders.map((o) => (
                        <tr className="hover:bg-gray-50" key={o.id} onClick={() => navigate("/order/details")}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="font-medium">{o.id}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img className="h-8 w-8 rounded-full mr-3" src={o.avatar} alt="Avatar" />
                                    <span>{o.customer}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {o.date}
                                <br />
                                <span className="text-gray-500">{o.time}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{o.items}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {o.total}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${o.statusClass}`}>{o.status}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex space-x-2">
                                    <button className={`text-blue-500 hover:text-blue-700${o.viewDisabled ? " cursor-not-allowed" : ""}`}>
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <button className={`${o.completeDisabled ? "text-gray-400 cursor-not-allowed" : "text-green-500 hover:text-green-700"}`}>
                                        <i className="fa-solid fa-check-circle"></i>
                                    </button>
                                    <button className={`${o.cancelDisabled ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:text-red-700"}`}>
                                        <i className="fa-solid fa-ban"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing 5 of 128 orders</p>
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
    )
};

export default OrdersTable;
