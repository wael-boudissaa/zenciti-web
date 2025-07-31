import React from "react";
import type { OrderInformation } from "../hooks/hook_order";

type Props = {
    order: OrderInformation | null;
    loading: boolean;
};

const OrderSummary: React.FC<Props> = ({ order, loading }) => {
    if (loading) {
        return <div className="p-6">Loading...</div>;
    }
    if (!order) {
        return <div className="p-6">Order not found.</div>;
    }

    // Format date/time
    const dt = new Date(order.createdAt);
    const dateStr = dt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const timeStr = dt.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="flex flex-wrap">
            <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
                <div className="flex items-center mb-6">
                    <img
                        className="h-16 w-16 rounded-full mr-6"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                        alt="Customer Avatar"
                    />
                    <div>
                        <h2 className="text-xl font-bold mb-1">
                            {order.clientFirstName} {order.clientLastName}
                        </h2>
                        <div className="flex items-center text-gray-500 space-x-4">
                            <div className="flex items-center">
                                <i className="fa-solid fa-envelope mr-2"></i>
                                <span>{order.clientEmail}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="font-medium">#{order.idOrder}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Date &amp; Time</p>
                        <p className="font-medium">{dateStr}</p>
                        <p className="text-sm text-gray-500">{timeStr}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Reservation</p>
                        <p className="font-medium">{order.reservationTime || "N/A"}</p>
                        <p className="text-sm text-gray-500">
                            {order.numberOfPeople
                                ? `${order.numberOfPeople} People`
                                : ""}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span className={`px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800`}>
                            {order.status}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-2"> Address</p>
                        <p className="font-medium">
                            {order.clientFirstName} {order.clientLastName}
                        </p>
                        <p className="text-gray-700">{order.clientAddress}</p>
                        {/* Optionally, split address if format allows */}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Contact Information</p>
                        <p className="flex items-center text-gray-700 mb-1">
                            <i className="fa-solid fa-phone mr-2 text-gray-500"></i>
                            {order.clientPhone}
                        </p>
                        <p className="flex items-center text-gray-700">
                            <i className="fa-solid fa-envelope mr-2 text-gray-500"></i>
                            {order.clientEmail}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            {/* If you have subtotal, use it; else, fallback to totalPrice */}
                            <span className="font-medium">
                                $
                                {order.foodItems
                                    ? order.foodItems
                                        .reduce((sum, item) => sum + item.subtotal, 0)
                                        .toFixed(2)
                                    : order.totalPrice.toFixed(2)}
                            </span>
                        </div>
                        {/* Optionally, display delivery fee/tax if available */}
                        <div className="flex justify-between pt-3 border-t border-gray-200">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">${order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <button className="w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center">
                            <i className="fa-solid fa-print mr-2"></i>
                            Print Receipt
                        </button>
                        <button className="w-full border border-primary text-primary py-2 rounded-lg flex items-center justify-center">
                            <i className="fa-solid fa-envelope mr-2"></i>
                            Email Receipt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderSummary;
