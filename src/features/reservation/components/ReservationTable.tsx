import React, { useState, useEffect, useCallback } from "react";
import ReservationDetailsPage from "../reservation_details";
import { getRestaurantReservations, type ApiResponse } from "../hooks/hooks";
import type { FilterState } from "./ReservationFilters";

type Reservation = {
    idReservation: string;
    avatar: string;
    name: string;
    email: string;
    time: string;
    meal: string;
    table: string;
    guests: string;
    special: string;
    status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
    statusColor: string;
    createdAt: string;
    timeFrom: string;
};

type Props = {
    idRestaurant: string;
    filters?: FilterState;
};

function formatStatus(status: string): { label: Reservation["status"]; color: string } {
    switch (status.toLowerCase()) {
        case "confirmed":
            return { label: "Confirmed", color: "bg-primary-light text-primary/80" };
        case "pending":
            return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
        case "cancelled":
            return { label: "Cancelled", color: "bg-red-100 text-red-800" };
        case "completed":
            return { label: "Completed", color: "bg-blue-100 text-blue-800" };
        default:
            return { label: "Pending", color: "bg-gray-100 text-gray-800" };
    }
}

function formatTime(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function formatDay(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatMeal(dateStr: string) {
    const d = new Date(dateStr);
    const h = d.getHours();
    if (h < 11) return "Breakfast";
    if (h < 16) return "Lunch";
    return "Dinner";
}

function getInitials(fullName: string) {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatTableNumber(tableId: string | null | undefined) {
    if (!tableId) return null;
    
    // If the tableId is in format like "table-1" or "T1", extract the number
    const match = tableId.match(/(\d+)/);
    if (match) {
        return `Table ${match[1]}`;
    }
    
    // If it's already in a good format or short, return as is
    if (tableId.length <= 3) {
        return `Table ${tableId}`;
    }
    
    // For long IDs, show first few characters
    return `Table ${tableId.substring(0, 3)}...`;
}

export default function ReservationTable({ idRestaurant, filters }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [modalData, setModalData] = useState<Reservation | null>(null);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [allReservations, setAllReservations] = useState<Reservation[]>([]);

    const filterReservations = useCallback((reservations: Reservation[], filters?: FilterState) => {
        if (!filters) return reservations;

        return reservations.filter(reservation => {
            // Status filter
            if (filters.status !== "All Statuses" && reservation.status !== filters.status) {
                return false;
            }

            // Table size filter
            if (filters.tableSize !== "All Sizes") {
                const guestCount = parseInt(reservation.guests.split(" ")[0]);
                switch (filters.tableSize) {
                    case "1-2 People":
                        if (guestCount < 1 || guestCount > 2) return false;
                        break;
                    case "3-4 People":
                        if (guestCount < 3 || guestCount > 4) return false;
                        break;
                    case "5-6 People":
                        if (guestCount < 5 || guestCount > 6) return false;
                        break;
                    case "7+ People":
                        if (guestCount < 7) return false;
                        break;
                }
            }

            // Time slot filter
            if (filters.timeSlot !== "All Times") {
                const reservationTime = new Date(reservation.timeFrom);
                const hour = reservationTime.getHours();
                
                switch (filters.timeSlot) {
                    case "Breakfast (6-10 AM)":
                        if (hour < 6 || hour >= 10) return false;
                        break;
                    case "Lunch (11 AM-2 PM)":
                        if (hour < 11 || hour >= 14) return false;
                        break;
                    case "Dinner (5-10 PM)":
                        if (hour < 17 || hour >= 22) return false;
                        break;
                }
            }

            // Date range filter (simplified - just Today for now)
            if (filters.dateRange !== "Today") {
                const reservationDate = new Date(reservation.timeFrom);
                const today = new Date();
                
                switch (filters.dateRange) {
                    case "Tomorrow": {
                        const tomorrow = new Date(today);
                        tomorrow.setDate(today.getDate() + 1);
                        if (reservationDate.toDateString() !== tomorrow.toDateString()) return false;
                        break;
                    }
                    case "This Week": {
                        const weekStart = new Date(today);
                        weekStart.setDate(today.getDate() - today.getDay());
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekStart.getDate() + 6);
                        if (reservationDate < weekStart || reservationDate > weekEnd) return false;
                        break;
                    }
                }
            }

            return true;
        });
    }, []);

    const fetchReservations = useCallback(async () => {
        setLoading(true);
        try {
            const response: ApiResponse = await getRestaurantReservations(idRestaurant, page);
            setTotalPages(response.totalPages ?? 1);
            setTotalCount(response.totalCount ?? 0);
            const mappedReservations = (response.reservations || [])
                .map((r) => {
                    try {
                        const status = formatStatus(r.status);
                        return {
                            idReservation: r.idReservation || '',
                            avatar: r.fullName || 'Unknown',
                            name: r.fullName || 'Unknown',
                            email: r.email || "",
                            time: formatTime(r.timeFrom),
                            meal: formatMeal(r.timeFrom),
                            table: (r.tableId && r.tableId !== "null" && r.tableId !== "") ? r.tableId : null,
                            guests: `${r.numberOfPeople || 0} people`,
                            special: r.special || "",
                            status: status.label,
                            statusColor: status.color,
                            createdAt: r.createdAt || '',
                            timeFrom: r.timeFrom || '',
                        };
                    } catch (e) {
                        console.warn('Error processing reservation:', r, e);
                        return null;
                    }
                })
                .filter(Boolean); // Remove null entries
            setAllReservations(mappedReservations);
            setReservations(filterReservations(mappedReservations, filters));
        } catch (e) {
            setReservations([]);
        }
        setLoading(false);
    }, [idRestaurant, page]);

    useEffect(() => {
        if (idRestaurant) fetchReservations();
    }, [idRestaurant, page, fetchReservations]);

    // Apply filters when filters change
    useEffect(() => {
        setReservations(filterReservations(allReservations, filters));
    }, [filters, allReservations, filterReservations]);

    const handleRowClick = (reservation: Reservation, index: number) => {
        setModalData(reservation);
        setOpenIndex(index);
    };

    const handleCloseModal = () => {
        setOpenIndex(null);
        setModalData(null);
    };

    const handleStatusChange = () => {
        fetchReservations();
        handleCloseModal();
    };

    const goToPage = (p: number) => {
        if (p >= 1 && p <= totalPages) setPage(p);
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold">All Reservations</h3>
                    </div>
                    <div className="flex space-x-2">
                        <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center transition">
                            <i className="fa-solid fa-download mr-2"></i>
                            Export
                        </button>
                        <button className="text-sm bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg flex items-center transition">
                            <i className="fa-solid fa-plus mr-2"></i>
                            Add New
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left">
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Special Requests</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reservations.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-gray-400">No reservations found.</td>
                                    </tr>
                                ) : (
                                    reservations.map((r, i) => (
                                        <tr key={r.idReservation} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => handleRowClick(r, i)}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3 text-base uppercase">
                                                        {getInitials(r.avatar)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{r.name}</div>
                                                        <div className="text-gray-500 text-sm">{r.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium">{formatDay(r.timeFrom)} - {r.time}</div>
                                                <div className="text-gray-500 text-sm">{r.meal}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                                    formatTableNumber(r.table) 
                                                        ? 'bg-light text-primary' 
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {formatTableNumber(r.table) || 'Unassigned'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center">
                                                    <i className="fa-solid fa-user mr-2 text-gray-500"></i>
                                                    <span>{r.guests}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="max-w-xs truncate">{r.special}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${r.statusColor} font-medium`}>
                                                    {r.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="px-6 py-4 border-t flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing page {page} of {totalPages}, total {totalCount} reservations
                    </p>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                            onClick={() => goToPage(page - 1)}
                            disabled={page === 1}
                        >
                            <i className="fa-solid fa-chevron-left text-xs"></i>
                        </button>
                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx}
                                className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 transition"}`}
                                onClick={() => goToPage(idx + 1)}
                            >
                                {idx + 1}
                            </button>
                        ))}
                        <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                            onClick={() => goToPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            <i className="fa-solid fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal for reservation details */}
            {modalData && openIndex !== null && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="relative w-full max-w-3xl mx-auto">
                        <button
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-2xl z-10"
                            onClick={handleCloseModal}
                        >
                            <i className="fa-solid fa-times"></i>
                        </button>
                        <div className="bg-white rounded-xl shadow-xl p-8 overflow-y-auto max-h-[80vh]">
                            <ReservationDetailsPage
                                idReservation={modalData.idReservation}
                                onStatusChange={handleStatusChange}
                                onClose={handleCloseModal}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
