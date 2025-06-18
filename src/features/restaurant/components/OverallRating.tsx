import React from "react";

export const OverallRatingCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h3 className="font-bold text-lg">Overall Rating</h3>
    </div>
    <div className="p-6 text-center">
      <div className="mb-4">
        <span className="text-5xl font-bold text-gray-800">4.3</span>
        <div className="flex justify-center mt-2 text-yellow-400">
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-regular fa-star-half-stroke" />
        </div>
        <p className="text-gray-500 mt-1">Based on 487 reviews</p>
      </div>
      <div className="space-y-2">
        {[
          { label: 5, color: "bg-green-500", percent: 65 },
          { label: 4, color: "bg-green-400", percent: 20 },
          { label: 3, color: "bg-yellow-500", percent: 10 },
          { label: 2, color: "bg-orange-500", percent: 3 },
          { label: 1, color: "bg-red-500", percent: 2 },
        ].map((row) => (
          <div className="flex items-center" key={row.label}>
            <span className="text-sm w-8">{row.label}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
              <div
                className={`h-2 ${row.color} rounded-full`}
                style={{ width: `${row.percent}%` }}
              />
            </div>
            <span className="text-sm w-8">{row.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
