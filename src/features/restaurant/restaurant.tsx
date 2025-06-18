import React from "react";
import Sidebar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import { RestaurantTabs } from "./components/RestaurantTables";
import { RestaurantInfoCard } from "./components/RestaurantInfo";
import { RecentReviews } from "./components/RestaurantReview";
import { RestaurantStatsSidebar } from "./components/RestaurantStatsSideBar";
import { StaffSection } from "./components/StaffSection";
import { useAuth } from "../../app/context";
import { getRestaurantStaff, type StaffMember } from "./hooks/hooks";


const RestaurantProfilePage: React.FC = () => {
    const user = useAuth();

    const idRestaurant = user.user?.idRestaurant || "";

    const [staffRows, setStaffRows] = React.useState<StaffMember[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
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
    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="p-6">
                    <RestaurantTabs />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <RestaurantInfoCard idRestaurant={user.user?.idRestaurant} />
                            <RecentReviews idRestaurant={user.user?.idRestaurant} />
                        </div>
                        <RestaurantStatsSidebar staffRows={staffRows} loading={loading} error={error}/>
                    </div>
                    <StaffSection staffRows={staffRows} loading={loading} error={error} />
                </div>
            </div>
        </div>
    );
}
export default RestaurantProfilePage;
