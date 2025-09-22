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

            <div className="flex flex-col">
                <StaffRatingOverview staffRows={staffRows} loading={loading}error={error}/>
            </div>
    );
}
