import React from "react";
import { getRestaurantInformation } from "../hooks/hooks";
import { useAuth } from "../../../app/context";

type RestaurantInformation = {
    idRestaurant: string;
    idAdminRestaurant: string;
    name: string;
    image: string;
    description: string;
    capacity: number;
    location: string;
    // This fields 
    cuisineType?: string;
    priceRange?: string;
    contactEmail?: string;
    phoneNumber?: string;
    operatingHours?: {
        mondayThursday: string;
        fridaySaturday: string;
        sunday: string;
    };
};

type RestaurantInfoCardProps = {
    idRestaurant: string;
};

export const RestaurantInfoCard: React.FC<RestaurantInfoCardProps> = ({ idRestaurant }) => {
    const [info, setInfo] = React.useState<RestaurantInformation | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const { user } = useAuth();

    React.useEffect(() => {
        setLoading(true);
        getRestaurantInformation(idRestaurant)
            .then(setInfo)
            .catch(() => setError("Failed to load restaurant information."))
            .finally(() => setLoading(false));
    }, [idRestaurant]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!info) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">Restaurant Information</h3>
                    <p className="text-gray-500 text-sm">Basic details displayed to customers</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                    <i className="fa-solid fa-pen-to-square mr-1" /> Edit
                </button>
            </div>
            <div className="p-6">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                        <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                            <img
                                src={info.image || "https://storage.googleapis.com/uxpilot-auth.appspot.com/default-placeholder.png"}
                                alt="Restaurant Image"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <button className="bg-white text-gray-800 px-3 py-2 rounded-lg text-sm font-medium">
                                    <i className="fa-solid fa-camera mr-1" /> Change Photo
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 text-center bg-green-900 cursor-pointer px-8 py-2 rounded-lg text-white font-medium">
                            Edit Restaurant Information
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Restaurant Name
                                </label>
                                <p className="text-gray-800">{info.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cuisine Type
                                </label>
                                <p className="text-gray-800">
                                    {info.cuisineType || "Not specified"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <p className="text-gray-800">{info.location}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Email
                                </label>
                                <p className="text-gray-800">
                                    {user?.email || "Not specified"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <p className="text-gray-800">
                                    {user.phone || "Not specified"}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Operating Hours
                                </label>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Monday-Thursday:</span>
                                        <span className="text-gray-800">
                                            {info.operatingHours?.mondayThursday || "Not specified"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Friday-Saturday:</span>
                                        <span className="text-gray-800">
                                            {info.operatingHours?.fridaySaturday || "Not specified"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Sunday:</span>
                                        <span className="text-gray-800">
                                            {info.operatingHours?.sunday || "Not specified"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <p className="text-gray-800">{info.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
