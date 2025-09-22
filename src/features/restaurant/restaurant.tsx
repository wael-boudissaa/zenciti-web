import React, { useState } from "react";
import Sidebar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import { RestaurantTabs } from "./components/RestaurantTables";
import { RestaurantInfoCard } from "./components/RestaurantInfo";
import { RecentReviews } from "./components/RestaurantReview";
import { RestaurantStatsSidebar } from "./components/RestaurantStatsSideBar";
import { StaffSection } from "./components/StaffSection";
import { useAuth } from "../../app/context";
import { getRestaurantStaff, getRestaurantStats, type RestaurantRatingStats, type StaffMember } from "./hooks/hooks";
import RestaurantMenuPage from "./restaurantMenuPage";
import StaffPage from "./staff";


const RestaurantProfilePage: React.FC = () => {
    const context = useAuth();

    const [selectedTab, setSelectedTab] = useState("Profile");
    const idRestaurant = context.idRestaurant;

    const [staffRows, setStaffRows] = React.useState<StaffMember[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [restaurantStats, setRestaurantStats] = React.useState<RestaurantRatingStats>([]); // Adjust type as needed
    React.useEffect(() => {
        setLoading(true);
        const getRestaurantStaffs = async (idRestaurant: string) => {
            try {
                const response = await getRestaurantStaff(idRestaurant);
                setStaffRows(response || []);
                setLoading(false);

            }
            catch (err) {
                setError(`Failed to load staff ratings.${err}`);
                setLoading(false);
            }
        }
        getRestaurantStaffs(idRestaurant);

    }, [idRestaurant]);
    React.useEffect(() => {
        setLoading(true);
        const getInfo = async (idRestaurant: string) => {
            try {
                const response = await getRestaurantStats(idRestaurant);
                setRestaurantStats(response || []);
                setLoading(false);

            }
            catch (err: any) {
                // Don't show error for NULL rating data cases - they're handled in the hook
                if (err?.message?.includes('converting NULL to float64') ||
                    err?.message?.includes('overallAverage')) {
                    // Set default stats and don't show error
                    setRestaurantStats({
                        monthlyStats: [],
                        overallAverage: 0,
                        totalRatings: 0,
                        percentage5Stars: 0,
                        percentage4Stars: 0,
                        percentage3Stars: 0,
                        percentage2Stars: 0,
                        percentage1Star: 0,
                    });
                } else {
                    setError(`Failed to load stats ratings.${err}`);
                }
                setLoading(false);
            }
        }
        getInfo(idRestaurant);

    }, [idRestaurant]);

    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <RestaurantTabs selected={selectedTab} onTabSelect={setSelectedTab} />
                    {selectedTab == "Profile" && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <RestaurantInfoCard idRestaurant={idRestaurant} />
                            <RecentReviews idRestaurant={idRestaurant} />
                            <StaffSection staffRows={staffRows} loading={loading} error={error} />
                        </div>
                        <RestaurantStatsSidebar restaurantStats={restaurantStats} staffRows={staffRows} loading={loading} error={error} />
                    </div>}
                    {selectedTab == "Menu" && <RestaurantMenuPage idRestaurant={idRestaurant} />}
                    {selectedTab == "Staff" && <StaffPage idRestaurant={idRestaurant} />}
                </div>
            </div>
        </div>
    );
}
export default RestaurantProfilePage;
