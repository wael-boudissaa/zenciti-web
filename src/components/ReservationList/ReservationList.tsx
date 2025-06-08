import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faCheckSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getReservationOfToday } from "../../features/dashboard/hooks/hooks_reservation";
import type { ReservationListInformation } from "../../features/dashboard/hooks/hooks_reservation";

// const reservations = [
//     {
//         avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
//         name: "Lindsey Stroud",
//         email: "lindsey.stroud@gmail.com",
//         from: "OHIO",
//         order: "Check Order",
//         orderClass: "bg-green-100 text-green-800",
//         members: 2,
//     },
//     {
//         avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
//         name: "Sarah Brown",
//         email: "sarah.brown@gmail.com",
//         from: "Zenciti",
//         order: "Check Order",
//         orderClass: "bg-green-100 text-green-800",
//         members: 4,
//     },
//     {
//         avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
//         name: "Michael Owen",
//         email: "michael.owen@gmail.com",
//         from: "California",
//         order: "No",
//         orderClass: "bg-gray-100 text-gray-800",
//         members: 6,
//     },
//     {
//         avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
//         name: "Mary Jane",
//         email: "mary.jane@gmail.com",
//         from: "Chicago",
//         order: "Check Order",
//         orderClass: "bg-green-100 text-green-800",
//         members: 2,
//     },
//     {
//         avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
//         name: "Peter Dodle",
//         email: "peter.dodle@gmail.com",
//         from: "Zenciti",
//         order: "Check Order",
//         orderClass: "bg-green-100 text-green-800",
//         members: 2,
//     },
// ];

const ReservationList: React.FC<{ idRestaurant: string }> = ({ idRestaurant }) => {
    const [reservation, setReservation] = useState<ReservationListInformation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        console.log("Fetching: ", `/reservation/today/${idRestaurant}`);

        setLoading(true);
        setError(null);
        getReservationOfToday(idRestaurant)
            .then(data => {
                setReservation(Array.isArray(data) ? data : [data]);
            })
            .catch(err => {
                setError(err.message || "Failed to fetch reservations");
            })
            .finally(() => setLoading(false));

    }, [idRestaurant]);
    return (

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Reservation List</h3>
                    <div className="flex space-x-2">
                        <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center">
                            <FontAwesomeIcon icon={faFilter} className="mr-2" />
                            Filter
                        </button>
                        <button className="text-sm bg-green-900 text-white hover:bg-green-900/90 px-4 py-2 rounded-lg flex items-center">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add New
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="p-6 text-center text-gray-500">Loading...</div>
                ) : error ? (
                    <div className="p-6 text-center text-red-500">{error}</div>
                ) : (

                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left">
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reservation.map((r) => (
                                <tr className="hover:bg-gray-50" key={r.email} >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {/* <img className="h-8 w-8 rounded-full mr-3" src={r.} alt="Avatar" /> */}
                                            <span className="font-medium">{r.firstName} {r.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{r.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{r.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${r.address}`}>{r.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{r.numberOfPeople}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-500 hover:text-blue-700">
                                                <FontAwesomeIcon icon={faCheckSquare} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="px-6 py-4 border-t flex items-center justify-between">
                <p className="text-sm text-gray-600">Showing 5 of 25 entries</p>
                <div className="flex space-x-1">
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">
                        <i className="fa-solid fa-chevron-left text-xs"></i>
                    </button>
                    <button className="px-3 py-1 rounded bg-green-900 text-white">1</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">2</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">3</button>
                    <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">
                        <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReservationList;
