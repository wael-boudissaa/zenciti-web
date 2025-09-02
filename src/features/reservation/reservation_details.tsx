import React, { useState, useRef } from "react";
import type { ReservationDetails, Order } from "./hooks/hooks";
import { changeReservationStatus, getReservationDetails } from "./hooks/hooks";

type Props = {
    idReservation: string;
    initialReservation?: ReservationDetails;
    onStatusChange?: () => void; // Callback for parent to refetch reservations
    onClose?: () => void; // Callback for closing modal
};

const CustomerProfile: React.FC<{ reservation: ReservationDetails }> = ({ reservation }) => (
    <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3 text-gray-700">Customer Profile</h4>
        <div className="space-y-2">
            <div className="flex justify-between">
                <span className="text-gray-500">Total Visits</span>
                <span className="font-medium">{reservation.totalVisits}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{reservation.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Favorite Food</span>
                <span className="font-medium">{reservation.favoriteFood}</span>
            </div>
        </div>
    </div>
);

function prettyOrderId(id: string) {
    if (!id) return "";
    let core = id.replace(/^order[_-]?/i, "");
    return "ORD-" + core.substring(0, 5).toUpperCase();
}

const OrderHistory: React.FC<{ reservation: ReservationDetails }> = ({ reservation }) => (
    <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3 text-gray-700">Order History</h4>
        <div className="space-y-2">
            <div className="flex justify-between">
                <span className="text-gray-500">Total Orders</span>
                <span className="font-medium">{reservation.totalOrders}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Avg. Spend</span>
                <span className="font-medium">
                    {typeof reservation.averageSpending === "number"
                        ? `$${reservation.averageSpending.toFixed(2)}`
                        : "N/A"}
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Total Spent</span>
                <span className="font-medium">
                    {typeof reservation.totalSpent === "number"
                        ? `$${reservation.totalSpent.toFixed(2)}`
                        : "N/A"}
                </span>
            </div>
        </div>
        <div className="mt-4">
            <h5 className="font-semibold mb-2">Recent Orders</h5>
            {reservation.orders && reservation.orders.length > 0 ? (
                <ul className="space-y-2">
                    {reservation.orders.map((order: Order) => (
                        <li key={order.idOrder} className="border rounded p-2 flex justify-between items-center">
                            <div>
                                <div className="font-medium">
                                    <span className="bg-primary/10 text-primary font-mono rounded px-2 py-1 mr-1 ">
                                        {prettyOrderId(order.idOrder)}
                                    </span>
                                    <span className="text-gray-700">Order</span>
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {new Date(order.createdAt).toLocaleDateString()} ({order.itemCount} items)
                                </div>
                            </div>
                            <div className="font-bold text-primary">
                                {typeof order.totalPrice === "number"
                                    ? `$${order.totalPrice.toFixed(2)}`
                                    : "N/A"}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-gray-400 text-sm">No orders found.</div>
            )}
        </div>
    </div>
);

function prettyReservationId(id: string) {
    if (!id) return "";
    let core = id.replace(/^res[_-]?/i, "");
    let parts = [];
    for (let i = 0; i < core.length; i += 4) {
        parts.push(core.substring(i, i + 4));
    }
    return "RES-" + parts.map(p => p.toUpperCase()).join("-");
}

function useReservationStatus(
    idReservation: string,
    initialStatus: string,
    onStatusChange?: () => void,
    onClose?: () => void
) {
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function updateStatus(action: "cancel" | "confirm") {
        setLoading(true);
        setError(null);
        let newStatus = action === "cancel" ? "cancelled" : "confirmed";
        try {
            await changeReservationStatus(idReservation, newStatus);
            setStatus(newStatus);
            if (onStatusChange) onStatusChange();
            if (onClose) onClose();
        } catch (e: any) {
            setError(e?.message || "Failed to update status");
        } finally {
            setLoading(false);
        }
    }

    return {
        status,
        loading,
        error,
        cancel: () => updateStatus("cancel"),
        confirm: () => updateStatus("confirm"),
        setStatus,
    };
}

const ReservationDetailsPage: React.FC<Props> = ({
    idReservation,
    initialReservation,
    onStatusChange,
    onClose
}) => {
    const statusMap: Record<string, { label: string, color: string }> = {
        confirmed: { label: "Confirmed", color: "bg-primary-light text-primary/80" },
        pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
        cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
        completed: { label: "Completed", color: "bg-blue-100 text-blue-800" },
    };

    const [reservation, setReservation] = React.useState<ReservationDetails | undefined>(initialReservation);
    const [loading, setLoading] = React.useState(!initialReservation);
    const idInputRef = useRef<HTMLInputElement>(null);
    const [idInput, setIdInput] = useState("");

    // --- Use status mutation hook ---
    const {
        status,
        loading: statusLoading,
        error: statusError,
        cancel: cancelReservation,
        confirm: confirmReservation,
    } = useReservationStatus(idReservation, reservation?.status || "pending", onStatusChange, onClose);

    React.useEffect(() => {
        setLoading(true);
        getReservationDetails(idReservation)
            .then(data => setReservation(data))
            .finally(() => setLoading(false));
    }, [idReservation]);

    React.useEffect(() => {
        // If status changes, update reservation (to update UI color/label)
        if (reservation && status !== reservation.status) {
            setReservation(prev => prev ? { ...prev, status } : prev);
        }
    }, [status]);

    function handleCopyReservationId() {
        if (!reservation) return;
        const formattedId = prettyReservationId(reservation.idReservation);
        navigator.clipboard.writeText(formattedId);
    }

    // Confirm button is only enabled if ID input matches prettyReservationId
    const canConfirm =
        idInput.trim().toUpperCase() === prettyReservationId(reservation?.idReservation || "").toUpperCase();

    if (loading || !reservation) {
        return (
            <div className="flex items-center justify-center py-12">
                <span className="text-gray-400 text-lg">Loading...</span>
            </div>
        );
    }

    const statusDisplay = statusMap[(reservation.status || "pending").toLowerCase()] || statusMap["pending"];
    const partySize = `${reservation.numberOfPeople} people`;
    const time = new Date(reservation.timeFrom).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    const date = new Date(reservation.timeFrom).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Reservation Details</h1>
            <p className="text-gray-500 mb-8">Full details and verification for this reservation.</p>

            {/* Customer Info */}
            <div className="mb-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mr-4">
                            {(reservation.firstName?.[0] || "") + (reservation.lastName?.[0] || "")}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{reservation.fullName}</h2>
                            <p className="text-gray-500">{reservation.email}</p>
                            <p className="text-gray-500">{partySize}</p>
                        </div>
                    </div>
                    <div>
                        <span className={`px-3 py-1.5 text-sm rounded-full ${statusDisplay.color} font-medium`}>
                            {statusDisplay.label}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <CustomerProfile reservation={reservation} />
                    <OrderHistory reservation={reservation} />
                </div>
            </div>

            {/* Reservation Info */}
            <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Reservation Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Date &amp; Time</p>
                        <div className="flex items-center">
                            <i className="fa-regular fa-calendar text-primary mr-2"></i>
                            <p className="font-medium">{date} - {time}</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Party Size</p>
                        <div className="flex items-center">
                            <i className="fa-solid fa-users text-primary mr-2"></i>
                            <p className="font-medium">{partySize}</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Assigned Server</p>
                        <div className="flex items-center">
                            <i className="fa-solid fa-user-tie text-primary mr-2"></i>
                            <p className="font-medium">
                                {reservation.workerName || 'No server assigned'}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Reservation ID on its own beautiful line */}
                <div className="border rounded-lg p-4 mt-4 flex flex-col items-start">
                    <p className="text-sm text-gray-500 mb-2">Reservation ID</p>
                    <div className="flex items-center gap-3 w-full">
                        <span className="font-mono font-medium text-lg bg-gray-100 px-4 py-1.5 rounded select-all">{prettyReservationId(reservation.idReservation)}</span>
                        <button
                            className="ml-2 cursor-pointer text-primary hover:text-primary/80 transition flex items-center px-3 py-1.5 rounded border border-primary"
                            onClick={handleCopyReservationId}
                            title="Copy Reservation ID"
                            type="button"
                        >
                            <i className="fa-regular fa-copy mr-1"></i>
                            Copy
                        </button>
                    </div>
                </div>
            </div>

            {/* Verification Section (UI as before, but no Validate ID button) */}
            <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Verification</h3>
                <div className="bg-gray-50 rounded-lg p-5">
                    <div className="mb-5">
                        <p className="text-gray-700 mb-2">Current Status</p>
                        <div className="flex items-center">
                            <span className="inline-block w-3 h-3 rounded-full bg-primary/50 mr-2"></span>
                            <span className="font-medium">
                                Verified at {time} by {reservation.fullName}
                            </span>
                        </div>
                    </div>
                    <div className="mb-5">
                        <p className="text-gray-700 mb-2">Manual Verification</p>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1">
                                <input
                                    ref={idInputRef}
                                    type="text"
                                    placeholder="Enter reservation ID (e.g. RES-1234-5678)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={idInput}
                                    onChange={e => setIdInput(e.target.value)}
                                />
                            </div>
                            <button
                                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center"
                                onClick={confirmReservation}
                                disabled={!canConfirm || statusLoading || status === "confirmed" || status === "completed"}
                            >
                                <i className="fa-solid fa-check mr-2"></i>
                                {statusLoading && status !== "confirmed" ? "Confirming..." : "Confirm Arrival"}
                            </button>
                        </div>
                        {!canConfirm && (
                            <div className="text-yellow-600 text-sm mt-2">
                                Please enter the correct Reservation ID to confirm arrival.
                            </div>
                        )}
                        {statusError && (
                            <div className="text-red-600 text-sm mt-2">{statusError}</div>
                        )}
                    </div>
                    <div>
                        <p className="text-gray-700 mb-2">QR Code Verification</p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/2 flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg p-4">
                                <i className="fa-solid fa-qrcode text-6xl text-gray-400 mb-3"></i>
                                <p className="text-sm text-gray-500 text-center">
                                    Use the connected scanner to scan customer's QR code
                                </p>
                                <button className="mt-3 text-primary hover:text-primary/80 font-medium transition">
                                    Open Scanner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ACTIONS */}
            <div className="flex justify-self-start gap-3 mt-6">
                <button
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-lg font-medium transition flex items-center ml-auto"
                    onClick={cancelReservation}
                    disabled={statusLoading || status === "cancelled"}
                >
                    <i className="fa-solid fa-times mr-2"></i>
                    {statusLoading && status !== "cancelled" ? "Cancelling..." : "Cancel Reservation"}
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition flex items-center">
                    <i className="fa-solid fa-print mr-2"></i>
                    Print Details
                </button>
            </div>
        </div>
    );
};

export default ReservationDetailsPage;
