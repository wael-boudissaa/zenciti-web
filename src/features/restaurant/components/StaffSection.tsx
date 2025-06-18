import React from "react";
import { StaffRatingOverview } from "./StuffRating";
import { useAuth } from "../../../app/context";
import type { StaffMember } from "../hooks/hooks";
type StaffSectionType = {
    loading: boolean;
    error: boolean;
    staffRows: StaffMember[];
}
export const StaffSection: React.FC<StaffSectionType> = ({ loading, error, staffRows }) => {
    return (

        <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Staff Performance</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                    <i className="fa-solid fa-user-plus mr-1" /> Add New Staff
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <StaffRatingOverview staffRows={staffRows} loading={loading}error={error}/>
            </div>
        </div>
    );
}
