import React from "react";

interface ProfileProps {
    profile: {
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        phone: string;
    };
    totalOrders: number;
    totalSpent: number;
    firstOrderDate: string;
    averageRating: number;
}

const CustomerProfile: React.FC<ProfileProps> = ({ profile, totalOrders, totalSpent, firstOrderDate, averageRating }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-1">{profile.firstName} {profile.lastName}</h2>
                    <div className="flex items-center text-gray-500 space-x-4">
                        <div className="flex items-center">
                            <i className="fa-solid fa-envelope mr-2"></i>
                            <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fa-solid fa-phone mr-2"></i>
                            <span>{profile.phone}</span>
                        </div>
                    </div>
                </div>
                <div className="ml-auto">
                    <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
                        <i className="fa-solid fa-envelope mr-2"></i>
                        Contact
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-8">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            <i className="fa-solid fa-shopping-bag text-primary"></i>
                        </div>
                        <h3 className="font-medium">Total Orders</h3>
                    </div>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            <i className="fa-solid fa-money-bill-wave text-primary"></i>
                        </div>
                        <h3 className="font-medium">Total Spent</h3>
                    </div>
                    <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            <i className="fa-solid fa-calendar-alt text-primary"></i>
                        </div>
                        <h3 className="font-medium">First Order</h3>
                    </div>
                    <p className="text-lg font-medium">{firstOrderDate ? (new Date(firstOrderDate)).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "--"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            <i className="fa-solid fa-star text-primary"></i>
                        </div>
                        <h3 className="font-medium">Avg. Rating</h3>
                    </div>
                    <div className="flex items-center">
                        <p className="text-2xl font-bold mr-2">{averageRating > 0 ? averageRating.toFixed(1) : "N/A"}</p>
                        {averageRating > 0 ? (
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className={`fa-solid ${
                                            star <= averageRating
                                                ? "fa-star"
                                                : star - 0.5 <= averageRating
                                                    ? "fa-star-half-alt"
                                                    : "fa-star text-gray-300"
                                        }`}
                                    ></i>
                                ))}
                            </div>
                        ) : (
                            <span className="text-sm text-gray-500">No ratings yet</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerProfile;
