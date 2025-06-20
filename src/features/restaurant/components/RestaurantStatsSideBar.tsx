import React from "react";
import { OverallRatingCard } from "./OverallRating";
import { RatingTrendsChart } from "./RatingTrend";
import { TopStaffCard } from "./TopStaffCard";
import type { RestaurantRatingStats, StaffMember } from "../hooks/hooks";

type TopStaffType = {
    loading: boolean;
    error: boolean;
    staffRows: StaffMember[];
    restaurantStats: RestaurantRatingStats;

};
export const RestaurantStatsSidebar: React.FC<TopStaffType> = ({ restaurantStats, staffRows, loading, error }) => (
    <div className="space-y-6 h-full p-6 bg-gray-50 rounded-xl shadow-sm">
        <OverallRatingCard overallAverage={restaurantStats?.overallAverage ?? 0}
            totalRatings={restaurantStats?.totalRatings ?? 0}
            percentage5Stars={restaurantStats?.percentage5Stars ?? 0}
            percentage4Stars={restaurantStats?.percentage4Stars ?? 0}
            percentage3Stars={restaurantStats?.percentage3Stars ?? 0}
            percentage2Stars={restaurantStats?.percentage2Stars ?? 0}
            percentage1Star={restaurantStats?.percentage1Star ?? 0} />
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-lg">Rating Trends</h3>
            </div>
            <div className="p-6">
                <div className="h-[200px]">
                    <RatingTrendsChart stats={restaurantStats?.monthlyStats ?? []} />
                </div>
            </div>
        </div>
        <TopStaffCard staffRows={staffRows} loading={loading} error={error} />
    </div>
);
