import React from "react";

const statusColors = {
    active: "bg-primary text-green-700 border-green-500",
    inactive: "bg-gray-100 text-gray-500 border-gray-400",
    "on leave": "bg-yellow-100 text-yellow-700 border-yellow-400"
};

const StaffCard = ({ staff, onViewReview }) => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl duration-150 flex flex-col min-h-[360px] transition-all">
        {/* Header: Avatar and Status */}
        <div className="flex flex-col items-center px-6 pt-6 pb-2 relative">
            <div className="relative">
                <img
                    src={
                        staff.image
                        ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            staff.firstName + " " + staff.lastName
                        )}&background=E6F4F1&color=00674B`
                    }
                    alt={staff.firstName + " " + staff.lastName}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <span
                    className={`absolute -bottom-2 right-0 px-3 py-0.5 rounded-full text-xs font-medium border ${statusColors[staff.status] || "bg-gray-100 text-gray-500 border-gray-200"}`}
                >
                    {staff.status ? staff.status.charAt(0).toUpperCase() + staff.status.slice(1) : "Unknown"}
                </span>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white p-2 rounded-full text-gray-500 hover:text-green-900 border border-gray-200 shadow-sm transition">
                    <i className="fa-solid fa-pencil"></i>
                </button>
                <button className="bg-white p-2 rounded-full text-gray-500 hover:text-red-500 border border-gray-200 shadow-sm transition">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>

        {/* Main Info */}
        <div className="flex flex-col items-center px-6">
            <h3 className="font-bold text-lg text-gray-800 mt-2">
                {staff.firstName} {staff.lastName}
            </h3>
            <div className="flex items-center gap-2 mt-1 mb-1">
                <span className="text-sm text-primary font-medium">
                    {staff.nationnallity}
                </span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500">{staff.nativeLanguage}</span>
            </div>
            {staff.quote && (
                <p className="italic text-xs text-gray-500 mt-1 mb-2 text-center">"{staff.quote}"</p>
            )}
        </div>

        {/* Details Grid */}
        <div className="px-6 mt-1 mb-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
            <div className="font-semibold text-gray-600">Email:</div>
            <div className="text-gray-700 truncate">{staff.email}</div>
            <div className="font-semibold text-gray-600">Phone:</div>
            <div className="text-gray-700">{staff.phoneNumber}</div>
            <div className="font-semibold text-gray-600">Address:</div>
            <div className="text-gray-700 truncate">{staff.address}</div>
            <div className="font-semibold text-gray-600">Started:</div>
            <div className="text-gray-700">
                {staff.startWorking
                    ? new Date(staff.startWorking).toLocaleDateString()
                    : "N/A"}
            </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-yellow-400">
                <i className="fa-solid fa-star"></i>
            </span>
            <span className="font-bold text-md text-gray-800">{staff.rating ? staff.rating.toFixed(1) : "N/A"}</span>
            <span className="text-xs text-gray-500">/ 5.0</span>
        </div>

        {/* View Profile Button */}
        <div className="px-6 pb-5 pt-2 mt-auto">
            <button
                onClick={onViewReview}
                className="w-full py-2 bg-primary text-white rounded-lg font-semibold shadow hover:from-green-800 hover:to-accent transition"
            >
                View Profile
            </button>
        </div>
    </div>
);

export default StaffCard;
