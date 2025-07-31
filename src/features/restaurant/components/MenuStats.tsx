import React, { useEffect, useState } from "react";
import { getMenuStats, getFoodOfMenuActive, getCategoryFoodOfRestaurant, getRestaurantInformation, type MenuStats } from "../hooks/hooks";
import { generateMenuPDF, type MenuPDFData } from "../../../utils/pdfGenerator";
import CreateFoodModal from "./CreateFoodModel";
export const MenuStatsSidebar = ({ idRestaurant }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateFoodModal, setShowCreateFoodModal] = useState(false);
    const [isPrintingMenu, setIsPrintingMenu] = useState(false);

    useEffect(() => {
        setLoading(true);
        getMenuStats(idRestaurant)
            .then((res) => {
                setStats(res || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [idRestaurant]);

    const handlePrintMenu = async () => {
        if (isPrintingMenu) return;
        
        setIsPrintingMenu(true);
        try {
            // Fetch all required data in parallel
            const [restaurantInfo, categories, activeMenuItems] = await Promise.all([
                getRestaurantInformation(idRestaurant),
                getCategoryFoodOfRestaurant(idRestaurant),
                getFoodOfMenuActive(idRestaurant)
            ]);

            if (!restaurantInfo || !categories || !activeMenuItems) {
                throw new Error('Failed to fetch menu data');
            }

            const pdfData: MenuPDFData = {
                restaurantName: restaurantInfo.name || 'Restaurant',
                menuName: stats?.activeMenuName || 'Current Menu',
                categories: categories,
                items: activeMenuItems
            };

            // Generate PDF instantly (no image loading)
            generateMenuPDF(pdfData);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate menu PDF. Please try again.');
        } finally {
            setIsPrintingMenu(false);
        }
    };

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
                    <button 
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handlePrintMenu}
                        disabled={isPrintingMenu}
                    >
                        <i className={`fa-solid ${isPrintingMenu ? 'fa-spinner fa-spin' : 'fa-print'} mr-2`}></i> 
                        {isPrintingMenu ? 'Generating PDF...' : 'Print Elegant Menu'}
                    </button>
                    <button
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center justify-center"
                        onClick={() => setShowCreateFoodModal(true)}
                    >
                        <i className="fa-solid fa-plus mr-2"></i> Create Food
                    </button>
                </div>
            </div>
            <CreateFoodModal
                open={showCreateFoodModal}
                onClose={() => setShowCreateFoodModal(false)}
                idRestaurant={idRestaurant}
                onFoodCreated={() => {
                    // Optionally: refresh stats or trigger parent reload
                    setShowCreateFoodModal(false);
                }}
            />
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
