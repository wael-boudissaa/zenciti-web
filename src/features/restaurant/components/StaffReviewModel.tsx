import React, { useEffect, useState } from "react";
import { getRestaurantWorkerDetails } from "../hooks/hooks";

const getStars = (value: number) =>
    Array.from({ length: 5 }, (_, i) => (
        <i
            key={i}
            className={
                "fa-solid fa-star " +
                (i < Math.round(value) ? "text-yellow-400" : "text-gray-300")
            }
        />
    ));

export const WorkerProfileCard = ({
    open,
    onClose,
    idRestaurantWorker,
}: {
    open: boolean;
    onClose: () => void;
    idRestaurantWorker: string | null;
}) => {
    const [worker, setWorker] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open || !idRestaurantWorker) {
            setWorker(null);
            setError(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        getRestaurantWorkerDetails(idRestaurantWorker)
            .then((res) => {
                setWorker(res || null);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load worker details.");
                setLoading(false);
            });
    }, [open, idRestaurantWorker]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
            <div className="relative max-w-2xl w-full mx-2 bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
                    onClick={onClose}
                >
                    <i className="fa-solid fa-times text-xl"></i>
                </button>

                {loading ? (
                    <div className="flex items-center justify-center h-80">
                        <span className="text-gray-500">Loading worker details...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-80">
                        <span className="text-red-600">{error}</span>
                    </div>
                ) : !worker ? (
                    <div className="flex items-center justify-center h-80">
                        <span className="text-gray-400">No worker found.</span>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row items-center p-8">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-green-900 shadow-md">
                                {worker.image ? (
                                    <img
                                        src={worker.image}
                                        alt={worker.firstName + " " + worker.lastName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <i className="fa-solid fa-user text-4xl text-gray-400"></i>
                                )}
                            </div>
                            <div className="md:ml-8 mt-4 md:mt-0 flex-1 w-full">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {worker.firstName} {worker.lastName}
                                    </h2>
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${worker.status === "active" ? "bg-primary100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                                        {worker.status === "active" ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="text-yellow-500 flex items-center">
                                        {getStars(worker.rating)}
                                    </span>
                                    {worker.ratingStats && (
                                        <span className="text-sm text-gray-600">
                                            {worker.rating?.toFixed(1) ?? "N/A"} / 5 ({worker.ratingStats.totalRatings} ratings)
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-500 text-sm mb-2">
                                    <span>
                                        <i className="fa-solid fa-envelope mr-1" /> {worker.email}
                                    </span>
                                    <span>
                                        <i className="fa-solid fa-phone mr-1" /> {worker.phoneNumber}
                                    </span>
                                    <span>
                                        <i className="fa-solid fa-flag mr-1" /> {worker.nationnallity}
                                    </span>
                                    <span>
                                        <i className="fa-solid fa-language mr-1" /> {worker.nativeLanguage}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm mb-2">
                                    <i className="fa-solid fa-map-marker-alt mr-1" />
                                    <span>{worker.address}</span>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm mb-2">
                                    <i className="fa-solid fa-calendar-check mr-1" />
                                    <span>
                                        Working since:{" "}
                                        {worker.startWorking ? new Date(worker.startWorking).toLocaleDateString() : "N/A"}
                                    </span>
                                </div>
                                {worker.quote && (
                                    <div className="italic text-green-900 text-sm mt-2">
                                        <i className="fa-solid fa-quote-left mr-1" />
                                        {worker.quote}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="border-t border-gray-200 bg-gray-50 px-8 py-6">
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Rating Breakdown</h3>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="space-y-1">
                                        {worker.ratingStats && [
                                            [5, worker.ratingStats.percentage5Stars],
                                            [4, worker.ratingStats.percentage4Stars],
                                            [3, worker.ratingStats.percentage3Stars],
                                            [2, worker.ratingStats.percentage2Stars],
                                            [1, worker.ratingStats.percentage1Star],
                                        ].map(([star, percent]) => (
                                            <div key={star} className="flex items-center">
                                                <span className="w-10 flex-shrink-0 flex items-center">
                                                    {Array.from({ length: star }, (_, i) => (
                                                        <i key={i} className="fa-solid fa-star text-yellow-400 text-xs" />
                                                    ))}
                                                </span>
                                                <div className="w-full bg-gray-200 h-2 mx-2 rounded overflow-hidden">
                                                    <div
                                                        className="bg-primary h-2 rounded"
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>
                                                <span className="w-10 text-xs text-gray-700">{percent}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-md mb-2">Recent Reviews</h4>
                                    <div className="space-y-2">
                                        {worker.recentRatings && worker.recentRatings.length > 0 ? (
                                            worker.recentRatings.map((rating, idx) => (
                                                <div key={idx} className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-semibold text-green-900">
                                                            {rating.clientFirstName} {rating.clientLastName}
                                                        </span>
                                                        <span className="text-yellow-500 flex items-center">
                                                            {getStars(rating.ratingValue)}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 mb-1">{new Date(rating.createdAt).toLocaleString()}</div>
                                                    <div className="text-gray-700">{rating.comment}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-500 text-sm">No reviews yet.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WorkerProfileCard;
