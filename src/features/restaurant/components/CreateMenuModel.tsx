import React, { useState } from "react";
import { onCreateMenu } from "../hooks/hooks";

export const CreateMenuModal = ({ open, onClose, idRestaurant }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            await onCreateMenu(idRestaurant, name.trim());
            setName("");
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-medium">Create New Menu</h2>
                            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Menu Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900"
                                    placeholder="e.g. Fall 2025 Menu"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Menu"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
