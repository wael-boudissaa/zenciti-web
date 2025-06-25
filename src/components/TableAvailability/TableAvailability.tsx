import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faTable } from "@fortawesome/free-solid-svg-icons";
import { getTableAvaiabilityToday } from "../../features/dashboard/hooks/hooks_reservation";

// Utility for mapping API status to display values & colors
function getStatusInfo(occupied) {
    return occupied
        ? { status: "Occupied", statusColor: "red" }
        : { status: "Available", statusColor: "green" };
}

const TableAvailability = ({ idRestaurant }) => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getTableAvaiabilityToday(idRestaurant)
            .then((res) => {
                // If your API response shape is { data: [...] }
                setTables(res || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [idRestaurant]);

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Table Availability</h3>
                    <div className="flex space-x-2">
                        <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">Today</button>
                        <button className="text-sm bg-green-900 text-white hover:bg-green-900/90 px-4 py-2 rounded-lg flex items-center">
                            <FontAwesomeIcon icon={faTableCells} className="mr-2" />
                            View Floor Plan
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-6">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <span className="text-gray-400">Loading tables...</span>
                    </div>
                ) : tables.length === 0 ? (
                    <div className="flex items-center justify-center py-8">
                        <span className="text-gray-400">No tables found.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tables.map((t, idx) => {
                            const { status, statusColor } = getStatusInfo(t.occupied);

                            return (
                                <div className="border rounded-xl p-4 relative shadow group hover:shadow-lg transition" key={t.idTable || idx}>
                                    <div className="absolute top-3 right-3">
                                        <span className={`h-3 w-3 bg-${statusColor}-500 rounded-full inline-block border border-white shadow`}></span>
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <div className={`bg-${statusColor}-900/10 rounded-lg p-3 mr-3`}>
                                            <FontAwesomeIcon icon={faTable} className={`text-${statusColor}-900`} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{t.idTable.replace("t-", "Table ").replace("-", " #")}</h4>
                                            {Array.isArray(t.timeSlots) && t.timeSlots.length > 0 ? (
                                                <p className="text-xs text-gray-500">Reserved slots: {t.timeSlots.join(", ")}</p>
                                            ) : (
                                                <p className="text-xs text-gray-400">No reservations for today</p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Optionally display time slots */}
                                    <div className="text-xs text-gray-500 mb-1">
                                        {t.timeSlots && t.timeSlots.length > 0 && (
                                            <>Reserved: {t.timeSlots.join(", ")}</>
                                        )}
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`text-${statusColor}-600 font-medium`}>{status}</span>
                                    </div>
                                    {/* Optionally add "View Details" button or tooltip for more info */}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableAvailability;
