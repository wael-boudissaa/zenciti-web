import React from "react";

export const CreateMenuModal = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-medium">Create New Menu</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Menu Name</label>
                            <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-950 focus:border-green-900" placeholder="e.g. Fall 2023 Menu" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900" rows="3" placeholder="Brief description of this menu"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Menu Type</label>
                            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900">
                                <option>Regular Menu</option>
                                <option>Special Event Menu</option>
                                <option>Seasonal Menu</option>
                                <option>Lunch Menu</option>
                                <option>Dinner Menu</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                            <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900" />
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-green-900 focus:ring-green-900 border-gray-300 rounded" />
                                <span className="ml-2 text-sm text-gray-700">Set as active menu upon creation</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-1">This will deactivate the currently active menu.</p>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-900/90">
                            Create Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
