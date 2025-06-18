import React from "react";
import { getRecentReviews, type Review } from "../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

type RecentReviewsProps = {
    idRestaurant: string;
};

export const RecentReviews: React.FC<RecentReviewsProps> = ({ idRestaurant }) => {
    const [reviews, setReviews] = React.useState<Review[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setLoading(true);
        getRecentReviews(idRestaurant)
            .then((data) => setReviews(data || []))
            .catch(() => setError("Failed to load restaurant reviews."))
            .finally(() => setLoading(false));
    }, [idRestaurant]);

    // Helper to format stars visually
    const renderStars = (rating: number) => (
        <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) =>
                i < rating ? (
                    <FontAwesomeIcon icon={faStarSolid} key={i} />
                ) : (
                    <FontAwesomeIcon icon={faStarRegular} key={i} />
                )
            )}
        </div>
    );
    // Helper to format date as "x days ago" or similar
    const formatRelativeDate = (dateString: string) => {
        const now = new Date();
        const reviewDate = new Date(dateString);
        const diffMs = now.getTime() - reviewDate.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffDay > 0) return diffDay === 1 ? "1 day ago" : `${diffDay} days ago`;
        if (diffHour > 0) return diffHour === 1 ? "1 hour ago" : `${diffHour} hours ago`;
        if (diffMin > 0) return diffMin === 1 ? "1 minute ago" : `${diffMin} minutes ago`;
        return "just now";
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">Recent Reviews</h3>
                    <p className="text-gray-500 text-sm">Latest customer feedback</p>
                </div>
                <button className="text-primary hover:underline text-sm">View All</button>
            </div>
            <div className="p-6">
                <div className="space-y-6">
                    {loading && <div>Loading...</div>}
                    {error && <div className="text-red-500">{error}</div>}
                    {!loading && !error && reviews.length === 0 && (
                        <div className="text-gray-500">No reviews yet.</div>
                    )}
                    {reviews.map((review, idx) => (
                        <div
                            className={
                                idx < reviews.length - 1
                                    ? "border-b border-gray-100 pb-6"
                                    : ""
                            }
                            key={review.firstName + review.lastName + review.createdAt}
                        >
                            <div className="flex items-start">
                                <img
                                    className="h-10 w-10 rounded-full mr-3"
                                    // Fallback avatar: use initials if no avatar URL available
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        review.firstName + " " + review.lastName
                                    )}&background=random`}
                                    alt="Customer Avatar"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-medium">
                                            {review.firstName} {review.lastName}
                                        </h4>
                                        <span className="text-sm text-gray-500">
                                            {formatRelativeDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        {renderStars(review.rating)}
                                        <span className="ml-2 text-sm text-gray-600">{review.rating.toFixed(1)}</span>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
