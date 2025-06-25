import React from "react";

const StaffReviewModal = ({ open, onClose, staff }) => {
    if (!open || !staff) return null;
    // Example reviews
    const reviews = [
        {
            name: "Michael Johnson",
            avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
            date: "2 days ago",
            rating: 5.0,
            stars: 5,
            comment: "Maria was exceptional! She was very attentive and made great recommendations for wine pairings with our meal. Her knowledge of the menu was impressive and she made our anniversary dinner special.",
        },
        // ... add more reviews as needed
    ];

    // Example performance metrics
    const metrics = [
        { label: "Friendliness", value: 98 },
        { label: "Knowledge", value: 95 },
        { label: "Speed", value: 92 },
        { label: "Attentiveness", value: 94 },
        { label: "Problem Solving", value: 91 },
        { label: "Recommendation Quality", value: 96 }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                    <div className="flex items-center">
                        <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-full mr-3" />
                        <div>
                            <h3 className="text-xl font-bold">{staff.name}</h3>
                            <p className="text-gray-600">{staff.position}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-green-900 bg-opacity-5 rounded-lg p-4 text-center">
                            <p className="text-gray-600 text-sm mb-1">Overall Rating</p>
                            <div className="flex justify-center items-center">
                                <span className="text-3xl font-bold mr-2">{staff.rating}</span>
                                <div className="flex text-yellow-400">
                                    {[...Array(Math.floor(staff.rating))].map((_, i) => (
                                        <i key={i} className="fa-solid fa-star"></i>
                                    ))}
                                    {staff.rating % 1 !== 0 ? <i className="fa-solid fa-star-half-alt"></i> : null}
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">From {staff.reviews} reviews</p>
                        </div>
                        <div className="bg-green-900 bg-opacity-5 rounded-lg p-4 text-center">
                            <p className="text-gray-600 text-sm mb-1">Rating Trend</p>
                            <div className="flex justify-center items-center">
                                <span className={`text-3xl font-bold text-${staff.trendDir === "up" ? "green" : "red"}-600 mr-2`}>
                                    {staff.trend >= 0 ? "+" : ""}{staff.trend}
                                </span>
                                <i className={`fa-solid fa-arrow-trend-${staff.trendDir === "up" ? "up" : "down"} text-${staff.trendDir === "up" ? "green" : "red"}-600 text-2xl`}></i>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">Last 30 days</p>
                        </div>
                        <div className="bg-green-900 bg-opacity-5 rounded-lg p-4 text-center">
                            <p className="text-gray-600 text-sm mb-1">Customer Mentions</p>
                            <div className="text-3xl font-bold">42</div>
                            <p className="text-gray-500 text-sm mt-1">Last 30 days</p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h4 className="font-bold text-lg mb-3">Performance Metrics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {metrics.map(metric => (
                                <div key={metric.label}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">{metric.label}</span>
                                        <span className="font-medium">{metric.value}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="bg-green-900 h-full rounded-full" style={{ width: `${metric.value}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-lg">Recent Reviews</h4>
                            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                                <option value="recent">Most Recent</option>
                                <option value="highest">Highest Rated</option>
                                <option value="lowest">Lowest Rated</option>
                            </select>
                        </div>
                        <div className="space-y-6">
                            {reviews.map((review, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-6">
                                    <div className="flex items-start">
                                        <img className="h-10 w-10 rounded-full mr-3" src={review.avatar} alt="Customer Avatar" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-medium">{review.name}</h4>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(review.stars)].map((_, i) => (
                                                        <i key={i} className="fa-solid fa-star"></i>
                                                    ))}
                                                    {review.rating % 1 !== 0 ? <i className="fa-regular fa-star"></i> : null}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-600">
                                                    {review.rating.toFixed(1)}
                                                </span>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffReviewModal;
