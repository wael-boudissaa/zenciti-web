import React from "react";
import { type StaffMember } from "../hooks/hooks";

type StaffRatingOverviewProps = {
    loading: boolean;
    error: boolean;
    staffRows: StaffMember[];

};

export const StaffRatingOverview: React.FC<StaffRatingOverviewProps> = ({ loading, error, staffRows }) => {


    const renderStars = (rating: number) => (
        <div className="flex text-yellow-400 mr-2">
            {Array.from({ length: 5 }).map((_, i) =>
                rating >= i + 1 ? (
                    <i className="fa-solid fa-star" key={i} />
                ) : rating > i ? (
                    <i className="fa-solid fa-star-half-alt" key={i} />
                ) : (
                    <i className="fa-regular fa-star" key={i} />
                )
            )}
        </div>
    );

    return (
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-lg">Staff Rating Overview</h3>
            </div>
            <div className="p-6">
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Staff Member
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nationality
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Native Language
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {staffRows.map((staff) => (
                                    <tr key={staff.idRestaurantWorker}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    className="h-10 w-10 rounded-full mr-3"
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        staff.firstName + " " + staff.lastName
                                                    )}&background=random`}
                                                    alt="Staff Avatar"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-800">
                                                        {staff.firstName} {staff.lastName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{staff.address}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {staff.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {staff.phoneNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {staff.nationnallity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {staff.nativeLanguage}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {renderStars(staff.rating)}
                                                <span>{staff.rating.toFixed(1)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {staffRows.length === 0 && (
                            <div className="text-gray-500 text-center py-4">No staff found.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
