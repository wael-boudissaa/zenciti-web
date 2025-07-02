import React, { useEffect, useState } from "react";
import { getUpcomingReservation } from "../hooks/hooks";

export default function UpcomingReservations({ idRestaurant }: { idRestaurant: string }) {
    const [reservations, setReservations] = useState<ReservationUpcoming[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!idRestaurant) return;
        setLoading(true);
        getUpcomingReservation(idRestaurant)
            .then((data) => {
                setReservations(data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false))
    }, [idRestaurant]);

    // Helper: format date to readable string (e.g. Jun 8, 2023)
    function formatDate(dateStr: string) {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    // Helper: format time (e.g. 19:00 -> 7:00 PM)
    function formatTime(timeStr: string) {
        if (!timeStr) return "";
        const [h, m] = timeStr.split(":");
        const date = new Date();
        date.setHours(Number(h), Number(m));
        return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    }

    // Helper: badge logic (Today, Tomorrow, etc.)
    function getBadge(dateStr: string) {
        const today = new Date();
        const target = new Date(dateStr);
        const diff = Math.ceil((target.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
        if (diff === 0) return { badge: "Today", badgeColor: "bg-green-100 text-green-800" };
        if (diff === 1) return { badge: "Tomorrow", badgeColor: "bg-blue-100 text-blue-800" };
        if (diff > 1 && diff < 7) return { badge: formatDate(dateStr), badgeColor: "bg-purple-100 text-purple-800" };
        return { badge: formatDate(dateStr), badgeColor: "bg-gray-100 text-gray-800" };
    }

    // Fallback avatar (initials)
    function getAvatar(first: string, last: string) {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(first + " " + last)}&background=E6F4F1&color=00674B`;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold">Upcoming Reservations</h3>
                    <p className="text-sm text-gray-500">Next 7 days</p>
                </div>
                <div>
                    <button className="text-sm text-green-900 font-medium hover:underline">View All</button>
                </div>
            </div>
            <div className="p-5">
                {loading ? (
                    <div className="text-gray-400 text-center py-8">Loading...</div>
                ) : reservations.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">No upcoming reservations.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reservations.map((r, i) => {
                            // Use correct fallback and map API fields to card fields
                            const { badge, badgeColor } = getBadge(r.date);
                            return (
                                <div key={r.idReservation} className="border rounded-lg p-4 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full mr-3" src={getAvatar(r.firstName, r.lastName)} alt="Avatar" />
                                            <div>
                                                <div className="font-medium">{r.firstName} {r.lastName}</div>
                                                {/* Phone not in API so we skip it or show N/A */}
                                                {/* <div className="text-sm text-gray-500">{r.phone || "N/A"}</div> */}
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${badgeColor}`}>{badge}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div className="bg-gray-50 rounded p-2">
                                            <p className="text-xs text-gray-500">Date</p>
                                            <p className="font-medium">{formatDate(r.date)}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded p-2">
                                            <p className="text-xs text-gray-500">Time</p>
                                            <p className="font-medium">{formatTime(r.time)}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded p-2">
                                            <p className="text-xs text-gray-500">Guests</p>
                                            <p className="font-medium">{r.numberPeople || r.numberOfPeople} people</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="bg-light text-green-900 text-sm font-medium px-3 py-1 rounded-full">
                                            Table #{r.idTable?.replace(/[^0-9]/g, "") || "there is no table assigned"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
