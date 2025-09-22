import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faTable } from "@fortawesome/free-solid-svg-icons";
import { getTableAvaiabilityToday } from "../../features/dashboard/hooks/hooks_reservation";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Table Availability</h3>
                    <div className="flex space-x-2">
                        <button className="text-sm bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg flex items-center" onClick={() => navigate(`/table`)}>
                            <FontAwesomeIcon icon={faTableCells} className="mr-2" />
                            View Floor Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableAvailability;
