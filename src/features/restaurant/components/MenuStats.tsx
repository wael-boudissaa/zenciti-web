import React, { useEffect, useState } from "react";
import { getMenuStats, type MenuStats } from "../hooks/hooks";

export const MenuStatsSidebar = ({ idRestaurant }) => {
    const [stats, setStats] = useState<MenuStats>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("MenuStatsSidebar: idRestaurant =", idRestaurant);

        setLoading(true);
        getMenuStats(idRestaurant)
            .then((res) => {
                setStats(res || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [idRestaurant]);

    if (loading || !stats) {
        return (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center min-h-[300px]">
                <span className="text-gray-400">Loading menu stats...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Menu Overview Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="font-bold text-lg">Menu Overview</h3>
                </div>
                <div className="p-6 space-y-6">
                    <StatRow label="Total Menus:" value={stats.totalMenus} />
                    <StatRow label="Active Menu:" value={stats.activeMenuName} valueClass="text-green-600" />
                    <StatRow label="Total Items:" value={stats.totalItems} />
                    <StatRow label="Categories:" value={stats.totalCategories} />
                    <StatRow label="Available Items:" value={stats.availableFoods} />
                    <StatRow label="Unavailable Items:" value={stats.unavailableFoods} valueClass="text-red-600" />
                </div>
            </div>
            {/* Popular Items Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="font-bold text-lg">Popular Items</h3>
                </div>
                <div className="p-6 space-y-4">
                    {(stats.popularFoods && stats.popularFoods.length > 0) ? (
                        stats.popularFoods.map((item, idx) => (
                            <PopularItem
                                key={item.foodName + idx}
                                name={item.foodName}
                                count={item.orderCount}
                            />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm">No popular items data.</div>
                    )}
                </div>
            </div>
            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="font-bold text-lg">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-3">
                    <button className="w-full px-4 py-2 bg-green-900 text-white rounded-lg text-sm flex items-center justify-center">
                        <i className="fa-solid fa-print mr-2"></i> Print Current Menu
                    </button>
                    <button className="w-full px-4 py-2 bg-accent text-white rounded-lg text-sm flex items-center justify-center">
                        <i className="fa-solid fa-download mr-2"></i> Export as PDF
                    </button>
                    <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm flex items-center justify-center hover:bg-gray-50">
                        <i className="fa-solid fa-copy mr-2"></i> Duplicate Menu
                    </button>
                    <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm flex items-center justify-center hover:bg-gray-50">
                        <i className="fa-solid fa-share-alt mr-2"></i> Share Menu Link
                    </button>
                </div>
            </div>
        </div>
    );
};

function StatRow({ label, value, valueClass = "" }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-600">{label}</span>
            <span className={`font-medium ${valueClass}`}>{value}</span>
        </div>
    );
}

function PopularItem({ name, count }) {
    return (
        <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 mr-3 flex-shrink-0 flex items-center justify-center">
                <i className="fa-solid fa-utensils text-xl text-green-900" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">{name}</h4>
                    <div className="flex items-center">
                        <span className="text-green-900 mr-1">
                            <i className="fa-solid fa-utensils"></i>
                        </span>
                        <span>{count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
