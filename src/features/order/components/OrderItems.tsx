import React from "react";
import type { FoodItems } from "../hooks/hook_order";

type Props = {
    items: FoodItems[];
};

const iconForItem = (name: string) => {
    // You can improve this mapping as needed
    const n = name.toLowerCase();
    if (n.includes("salmon")) return "fa-utensils";
    if (n.includes("salad") || n.includes("leaf")) return "fa-leaf";
    if (n.includes("cake") || n.includes("dessert") || n.includes("cookie")) return "fa-cookie";
    return "fa-utensils";
};

const tagForItem = (desc: string) => {
    // You may want to parse or modify this
    if (desc.toLowerCase().includes("main")) return "Main Course";
    if (desc.toLowerCase().includes("dessert")) return "Dessert";
    if (desc.toLowerCase().includes("appetizer")) return "Appetizer";
    return "";
};

const OrderItems: React.FC<Props> = ({ items }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b">
            <h3 className="font-bold text-lg">Order Items</h3>
            <p className="text-gray-500 text-sm">Items included in this order</p>
        </div>
        <div className="p-6">
            <div className="space-y-6">
                {items.map((item, i) => (
                    <div key={i} className={`flex flex-col sm:flex-row ${i < items.length - 1 ? "border-b border-gray-200 pb-6" : ""}`}>
                        <div className="sm:w-1/6 mb-4 sm:mb-0">
                            <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                                ) : (
                                    <i className={`fa-solid ${iconForItem(item.name)} text-2xl text-primary`}></i>
                                )}
                            </div>
                        </div>
                        <div className="sm:w-3/6">
                            <h4 className="font-bold text-lg">{item.name}</h4>
                            <p className="text-gray-600 mb-2">{item.description}</p>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <i className="fa-solid fa-tag mr-2"></i>
                                <span>{tagForItem(item.description)}</span>
                            </div>
                            {/* You can add more details here if you have them */}
                        </div>
                        <div className="sm:w-1/6 text-center mt-4 sm:mt-0">
                            <p className="text-gray-500 mb-1">Quantity</p>
                            <p className="font-bold text-lg">{item.quantity}</p>
                        </div>
                        <div className="sm:w-1/6 text-center mt-4 sm:mt-0">
                            <p className="text-gray-500 mb-1">Price</p>
                            <p className="font-bold text-lg">${item.subtotal.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">
                                (${item.price.toFixed(2)} each)
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default OrderItems;
