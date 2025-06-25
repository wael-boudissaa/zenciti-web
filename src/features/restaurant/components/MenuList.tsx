import React from "react";

export const MenuList = ({
    activeMenu,
    inactiveMenus,
    onCreateMenu,
    onViewMenu,
    viewedMenuId,
}) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg">Menu Management</h3>
                <p className="text-gray-500 text-sm">Manage all your restaurant menus</p>
            </div>
            <button
                onClick={onCreateMenu}
                className="px-4 py-2 bg-green-900 text-white rounded-lg text-sm"
            >
                <i className="fa-solid fa-plus mr-1"></i> Create New Menu
            </button>
        </div>
        <div className="p-6">
            {/* Active Menu */}
            {activeMenu && (
                <div id="active-menu" className="mb-8">
                    <h4 className="font-semibold text-md mb-4 flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        Active Menu
                    </h4>
                    <div className="border border-green-200 bg-green-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <i className="fa-solid fa-utensils text-green-900 text-xl mr-3"></i>
                                <div>
                                    <h5 className="font-medium text-gray-800">{activeMenu.name}</h5>
                                    <p className="text-sm text-gray-500">
                                        Active since: {activeMenu.since}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className={`px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 ${viewedMenuId === activeMenu.idMenu
                                            ? "font-bold text-green-900 border-green-900"
                                            : "text-gray-700"
                                        }`}
                                    onClick={() => onViewMenu(activeMenu.menuObj || activeMenu)}
                                >
                                    <i className="fa-solid fa-eye mr-1"></i> View
                                </button>
                                <button className="px-3 py-1.5 bg-green-900 text-white rounded text-sm hover:bg-green-900/90">
                                    <i className="fa-solid fa-pen-to-square mr-1"></i> Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Inactive Menus */}
            <div id="inactive-menus">
                <h4 className="font-semibold text-md mb-4 flex items-center">
                    <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                    Inactive Menus
                </h4>
                <div className="space-y-4">
                    {inactiveMenus.map((menu, idx) => (
                        <div
                            key={menu.idMenu || idx}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-utensils text-gray-400 text-xl mr-3"></i>
                                    <div>
                                        <h5 className="font-medium text-gray-800">{menu.name}</h5>
                                        <p className="text-sm text-gray-500">
                                            Last active: {menu.lastActive}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className={`px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 ${viewedMenuId === menu.idMenu
                                                ? "font-bold text-green-900 border-green-900"
                                                : "text-gray-700"
                                            }`}
                                        onClick={() => onViewMenu(menu.menuObj || menu)}
                                    >
                                        <i className="fa-solid fa-eye mr-1"></i> View
                                    </button>
                                    <button className="px-3 py-1.5 bg-accent text-white rounded text-sm hover:bg-accent/90">
                                        <i className="fa-solid fa-check mr-1"></i> Activate
                                    </button>
                                    <button className="px-2 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
