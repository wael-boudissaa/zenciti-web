import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faCheckSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getRestaurantReservations } from "../../features/reservation/hooks/hooks";
import type { ReservationListInformation } from "../../features/dashboard/hooks/hooks_reservation";
import ReservationDetailsPage from "../../features/reservation/reservation_details";

type DashboardReservation = ReservationListInformation & {
    idReservation?: string;
    tableId?: string;
};

function formatTableNumber(tableId: string) {
    if (!tableId) return "N/A";
    
    // If the tableId is in format like "table-1" or "T1", extract the number
    const match = tableId.match(/(\d+)/);
    if (match) {
        return `Table ${match[1]}`;
    }
    
    // If it's already in a good format or short, return as is
    if (tableId.length <= 3) {
        return `Table ${tableId}`;
    }
    
    // For long IDs, show first few characters
    return `Table ${tableId.substring(0, 3)}...`;
}

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
    const [reservation, setReservation] = useState<DashboardReservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        // Use the reservations API to get today's reservations with IDs
        getRestaurantReservations(idRestaurant, 1)
            .then(response => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                // Filter for today's reservations
                const todaysReservations = (response.reservations || [])
                    .filter(r => {
                        const reservationDate = new Date(r.timeFrom);
                        reservationDate.setHours(0, 0, 0, 0);
                        return reservationDate.getTime() === today.getTime();
                    })
                    .map(r => ({
                        idReservation: r.idReservation,
                        firstName: r.fullName?.split(' ')[0] || '',
                        lastName: r.fullName?.split(' ').slice(1).join(' ') || '',
                        email: '', // Email not available in this API
                        address: '', // Not available in this API
                        numberOfPeople: r.numberOfPeople,
                        status: r.status,
                        tableId: r.tableId
                    }));
                
                setReservation(todaysReservations);
            })
            .catch(err => {
                setError(err.message || "Failed to fetch reservations");
            })
            .finally(() => setLoading(false));
    }, [idRestaurant]);

    const handleReservationClick = (idReservation: string) => {
        setSelectedReservationId(idReservation);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReservationId(null);
    };

    const handleStatusChange = () => {
        // Refresh the reservations list after status change
        setLoading(true);
        getRestaurantReservations(idRestaurant, 1)
            .then(response => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const todaysReservations = (response.reservations || [])
                    .filter(r => {
                        const reservationDate = new Date(r.timeFrom);
                        reservationDate.setHours(0, 0, 0, 0);
                        return reservationDate.getTime() === today.getTime();
                    })
                    .map(r => ({
                        idReservation: r.idReservation,
                        firstName: r.fullName?.split(' ')[0] || '',
                        lastName: r.fullName?.split(' ').slice(1).join(' ') || '',
                        email: '', // Email not available in this API
                        address: '', 
                        numberOfPeople: r.numberOfPeople,
                        status: r.status,
                        tableId: r.tableId
                    }));
                
                setReservation(todaysReservations);
            })
            .catch(err => {
                setError(err.message || "Failed to fetch reservations");
            })
            .finally(() => setLoading(false));
        
        handleCloseModal();
    };

    return (
        <>
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
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reservation.map((r) => (
                                <tr 
                                    className="hover:bg-gray-50 cursor-pointer transition" 
                                    key={r.idReservation || r.email}
                                    onClick={() => r.idReservation && handleReservationClick(r.idReservation)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {/* <img className="h-8 w-8 rounded-full mr-3" src={r.} alt="Avatar" /> */}
                                            <span className="font-medium">{r.firstName} {r.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{r.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                            {formatTableNumber(r.tableId || '')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            r.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                            r.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            r.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>{r.status}</span>
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
            
            {/* Modal for reservation details */}
        {showModal && selectedReservationId && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                <div className="relative w-full max-w-3xl mx-auto">
                    <button
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                        onClick={handleCloseModal}
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                    <div className="bg-white rounded-xl shadow-xl p-8 overflow-y-auto max-h-[80vh]">
                        <ReservationDetailsPage
                            idReservation={selectedReservationId}
                            onStatusChange={handleStatusChange}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default ReservationList;
