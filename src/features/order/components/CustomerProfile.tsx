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
}

const CustomerProfile: React.FC<ProfileProps> = ({ profile, totalOrders, totalSpent, firstOrderDate }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center">
                <img className="h-16 w-16 rounded-full mr-6" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Customer Avatar" />
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
                    <button className="bg-green-900 text-white px-4 py-2 rounded-lg flex items-center">
                        <i className="fa-solid fa-envelope mr-2"></i>
                        Contact
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-8">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-900/10 rounded-full flex items-center justify-center mr-2">
                            <i className="fa-solid fa-shopping-bag text-green-900"></i>
                        </div>
                        <h3 className="font-medium">Total Orders</h3>
                    </div>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-900/10 rounded-full flex items-center justify-center mr-2">
                            <i className="fa-solid fa-money-bill-wave text-green-900"></i>
                        </div>
                        <h3 className="font-medium">Total Spent</h3>
                    </div>
                    <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-900/10 rounded-full flex items-center justify-center mr-2">
                            <i className="fa-solid fa-calendar-alt text-green-900"></i>
                        </div>
                        <h3 className="font-medium">First Order</h3>
                    </div>
                    <p className="text-lg font-medium">{firstOrderDate ? (new Date(firstOrderDate)).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "--"}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-900/10 rounded-full flex items-center justify-center mr-2">
                            <i className="fa-solid fa-star text-green-900"></i>
                        </div>
                        <h3 className="font-medium">Avg. Rating</h3>
                    </div>
                    <div className="flex items-center">
                        <p className="text-2xl font-bold mr-2">4.8</p>
                        <div className="flex text-yellow-400">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerProfile;
