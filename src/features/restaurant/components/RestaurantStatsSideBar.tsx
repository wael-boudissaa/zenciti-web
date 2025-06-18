import React from "react";
import { OverallRatingCard } from "./OverallRating";
import { RatingTrendsChart } from "./RatingTrend";
import { TopStaffCard } from "./TopStaffCard";
import type { StaffMember } from "../hooks/hooks";

type TopStaffType = {
    loading: boolean;
    error: boolean;
    staffRows: StaffMember[];

};
export const RestaurantStatsSidebar: React.FC<TopStaffType> = ({ staffRows, loading, error }) => (
    <div className="space-y-6 h-full p-6 bg-gray-50 rounded-xl shadow-sm">
        <OverallRatingCard />
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-lg">Rating Trends</h3>
            </div>
            <div className="p-6">
                <div className="h-[200px]">
                    <RatingTrendsChart />
                </div>
            </div>
        </div>
        <TopStaffCard staffRows={staffRows} loading={loading} error={error} />
    </div>
);
