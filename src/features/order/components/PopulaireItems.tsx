import React, { useEffect, useState } from "react";
import { getPopularFood } from "../hooks/hook_order";

const PopularItems = ({ idRestaurant }) => {
    const [items, setItems] = useState([]);
    const [period, setPeriod] = useState("today");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPopularFood(idRestaurant)
            .then((res) => {
                setItems(
                    (res || [])
                        .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))
                        .map((item, idx) => ({
                            ...item,
                            rank: idx + 1,
                            totalOrders: item.total ?? 0,
                        }))
                );
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [idRestaurant, period]);

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Popular Menu Items</h3>
                </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-3 text-center text-gray-400">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="col-span-3 text-center text-gray-400">No data available.</div>
                ) : (
                    items.map((item) => (
                        <div className="border rounded-xl p-4 relative group hover:shadow" key={item.idFood || item.rank}>
                            <div className="absolute top-3 right-3">
                                <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                                    #{item.rank}
                                </span>
                            </div>
                            <div className="flex items-center mb-3">
                                <div className="bg-primary/10 rounded-lg p-3 mr-3 w-16 h-16 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover w-full h-full rounded-md"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-600">Orders:</span>
                                <span className="font-medium">{item.total} ordered</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PopularItems;
