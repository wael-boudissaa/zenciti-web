import React from "react";

type OverallRatingCardProps = {
    overallAverage: number;
    totalRatings: number;
    percentage5Stars: number;
    percentage4Stars: number;
    percentage3Stars: number;
    percentage2Stars: number;
    percentage1Star: number;
};

export const OverallRatingCard: React.FC<OverallRatingCardProps> = ({
    overallAverage,
    totalRatings,
    percentage5Stars,
    percentage4Stars,
    percentage3Stars,
    percentage2Stars,
    percentage1Star,
}) => {
    // Map ratings to display bars
    const stars = [
        { label: 5, color: "bg-green-500", percent: percentage5Stars },
        { label: 4, color: "bg-green-400", percent: percentage4Stars },
        { label: 3, color: "bg-yellow-500", percent: percentage3Stars },
        { label: 2, color: "bg-orange-500", percent: percentage2Stars },
        { label: 1, color: "bg-red-500", percent: percentage1Star },
    ];
    // Render stars for average
    const fullStars = Math.floor(overallAverage);
    const halfStar = overallAverage - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-lg">Overall Rating</h3>
            </div>
            <div className="p-6 text-center">
                <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-800">
                        {overallAverage.toFixed(1)}
                    </span>
                    <div className="flex justify-center mt-2 text-yellow-400">
                        {[...Array(fullStars)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star" />
                        ))}
                        {halfStar && <i className="fa-regular fa-star-half-stroke" />}
                        {[...Array(emptyStars)].map((_, i) => (
                            <i key={i} className="fa-regular fa-star" />
                        ))}
                    </div>
                    <p className="text-gray-500 mt-1">Based on {totalRatings} reviews</p>
                </div>
                <div className="space-y-2">
                    {stars.map((row) => (
                        <div className="flex items-center" key={row.label}>
                            <span className="text-sm w-8">{row.label}</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                                <div
                                    className={`h-2 ${row.color} rounded-full`}
                                    style={{ width: `${row.percent}%` }}
                                />
                            </div>
                            <span className="text-sm w-8">{row.percent.toFixed(0)}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
