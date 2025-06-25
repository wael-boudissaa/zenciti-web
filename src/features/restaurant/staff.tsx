import React, { useEffect, useState } from "react";
import StaffGrid from "./components/StaffGrid";
import AddStaffModal from "./components/AddStaffModel";
import StaffReviewModal from "./components/StaffReviewModel";
import { getRestaurantStaff } from "./hooks/hooks";

const StaffPage = ({ idRestaurant }) => {
    const [staffRows, setStaffRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    useEffect(() => {
        setLoading(true);
        getRestaurantStaff(idRestaurant)
            .then((res) => {
                setStaffRows(res || []);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load staff list.");
                setLoading(false);
            });
    }, [idRestaurant]);

    const handleViewReview = (staff) => {
        setSelectedStaff(staff);
        setReviewModalOpen(true);
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-600 py-10">{error}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold">Staff Overview</h2>
                    <span className="ml-2 bg-green-900 bg-opacity-10 text-white px-2 py-1 rounded text-sm font-medium">
                        {staffRows.length} Total
                    </span>
                </div>
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="px-4 py-2 bg-green-900 text-white rounded-lg flex items-center"
                >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20 mr-2">
                        <i className="fa-solid fa-plus text-green-900"></i>
                    </span>
                    <span className="font-semibold tracking-wide">Create New Staff</span>
                </button>
            </div>

            <StaffGrid staffList={staffRows} onViewReview={handleViewReview} />

            <AddStaffModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
            <StaffReviewModal open={reviewModalOpen} onClose={() => setReviewModalOpen(false)} staff={selectedStaff} />
        </div>
    );
};

export default StaffPage;
