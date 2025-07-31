import React, { useState } from "react";
import { setFoodUnavailable, setFoodAvailable } from "../hooks/hooks"; // Ensure setFoodAvailable exists

export const ActiveMenuContent = ({ activeMenu, onEditMenu, onStatusChange }) => {
    const [selectedCategory, setSelectedCategory] = useState("All Items");
    const [updating, setUpdating] = useState<string | null>(null);

    const filteredItems =
        selectedCategory === "All Items"
            ? activeMenu.items
            : activeMenu.items.filter((item) => item.category === selectedCategory);

    const handleSetUnavailable = async (idFood) => {
        setUpdating(idFood);
        await setFoodUnavailable(idFood);
        if (onStatusChange) onStatusChange();
        setUpdating(null);
    };

    const handleSetAvailable = async (idFood) => {
        setUpdating(idFood);
        await setFoodAvailable(idFood);
        if (onStatusChange) onStatusChange();
        setUpdating(null);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">{activeMenu.name}</h3>
                    <p className="text-gray-500 text-sm">Currently active menu</p>
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm">
                        <i className="fa-solid fa-plus mr-1"></i> Add Item
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm" onClick={onEditMenu}>
                        <i className="fa-solid fa-pen-to-square mr-1"></i> Edit Menu
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div id="menu-categories" className="mb-6">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {activeMenu.categories.map((cat) => (
                            <button
                                key={cat}
                                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${selectedCategory === cat
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div id="menu-items" className="space-y-4">
                    {filteredItems.map((item, idx) => (
                        <div
                            key={item.idFood}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150"
                        >
                            <div className="flex">
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h5 className="font-medium text-gray-800">{item.name}</h5>
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                                                <i className="fa-solid fa-pen-to-square mr-1"></i> Edit
                                            </button>
                                            {item.status === "Available" ? (
                                                <button
                                                    className="px-3 py-1.5 bg-white border border-gray-300 text-red-500 rounded text-sm hover:bg-gray-50"
                                                    onClick={() => handleSetUnavailable(item.idFood)}
                                                    disabled={updating === item.idFood}
                                                >
                                                    <i className="fa fa-ban" aria-hidden="true"></i>{" "}
                                                    {updating === item.idFood ? "Updating..." : "Unavailable"}
                                                </button>
                                            ) : (
                                                <button
                                                    className="px-3 py-1.5 bg-white border border-gray-300 text-green-600 rounded text-sm hover:bg-gray-50"
                                                    onClick={() => handleSetAvailable(item.idFood)}
                                                    disabled={updating === item.idFood}
                                                >
                                                    <i className="fa fa-check-circle" aria-hidden="true"></i>{" "}
                                                    {updating === item.idFood ? "Updating..." : "Available"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-green-900">{item.price}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-500">Status:</span>
                                            <span
                                                className={`text-sm text-${item.statusColor} flex items-center`}
                                            >
                                                <i className="fa-solid fa-circle text-xs mr-1"></i>{" "}
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
