import React from "react";
import type { StaffMember } from "../hooks/hooks";

type TopStaffType = {
    loading: boolean;
    error: string | null;
    staffRows: StaffMember[];
};

export const TopStaffCard: React.FC<TopStaffType> = ({ loading, error, staffRows }) => {
    // Order staffRows by rating descending and take top 3
    const sortedStaff = [...staffRows]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg">Top Staff</h3>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {loading && <div>Loading...</div>}
                    {error && <div className="text-red-500">{error}</div>}
                    {!loading && !error && sortedStaff.length === 0 && (
                        <div className="text-gray-500">No staff available.</div>
                    )}
                    {!loading && !error && sortedStaff.map((staff) => (
                        <div className="flex items-center" key={staff.idRestaurantWorker}>
                            <img
                                className="h-10 w-10 rounded-full mr-3"
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    staff.firstName + " " + staff.lastName
                                )}&background=random`}
                                alt="Staff Avatar"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h4 className="font-medium">
                                        {staff.firstName} {staff.lastName}
                                    </h4>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 mr-1">
                                            <i className="fa-solid fa-star" />
                                        </span>
                                        <span>{staff.rating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">{staff.nationnallity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
