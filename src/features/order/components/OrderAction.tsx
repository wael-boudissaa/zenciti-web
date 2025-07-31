import React, { useState } from "react";
import { putOrderStatus } from "../hooks/hook_order";

type Props = {
    idOrder: string;
    currentStatus: string;
    onStatusChange?: (newStatus: string) => void;
};

const OrderActions: React.FC<Props> = ({ idOrder, currentStatus, onStatusChange }) => {
    const [loading, setLoading] = useState<"" | "ready" | "cancel">("");
    const [error, setError] = useState<string | null>(null);

    const handleStatusChange = async (status: "completed" | "cancelled") => {
        setLoading(status === "completed" ? "ready" : "cancel");
        setError(null);
        try {
            await putOrderStatus(idOrder, status);
            if (onStatusChange) onStatusChange(status);
        } catch (e: any) {
            setError("Failed to update order status.");
        }
        setLoading("");
    };

    // Optionally, disable buttons if already in that status
    const isReadyDisabled = currentStatus === "completed" || loading === "ready";
    const isCancelDisabled = currentStatus === "cancelled" || loading === "cancel";

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
                <h3 className="font-bold text-lg">Actions</h3>
            </div>
            <div className="p-6 flex flex-wrap gap-4">
                <button
                    className={`px-4 py-2 bg-primary text-white rounded-lg flex items-center ${isReadyDisabled ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/80"
                        }`}
                    disabled={isReadyDisabled}
                    onClick={() => handleStatusChange("completed")}
                >
                    <i className="fa-solid fa-check mr-2"></i>
                    {loading === "ready" ? "Marking..." : "Mark as Ready"}
                </button>
                <button
                    className={`px-4 py-2 border border-red-500 text-red-500 rounded-lg flex items-center ${isCancelDisabled ? "opacity-60 cursor-not-allowed" : "hover:bg-red-100"
                        }`}
                    disabled={isCancelDisabled}
                    onClick={() => handleStatusChange("cancelled")}
                >
                    <i className="fa-solid fa-times mr-2"></i>
                    {loading === "cancel" ? "Cancelling..." : "Cancel Order"}
                </button>
            </div>
            {error && (
                <div className="px-6 pb-4 text-red-600 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
};

export default OrderActions;
