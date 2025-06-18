import React from "react";

const feedbackStats = [
  { label: "Service Quality", value: 72 },
  { label: "Food Quality", value: 85 },
  { label: "Atmosphere", value: 68 },
  { label: "Value for Money", value: 63 },
  { label: "Cleanliness", value: 78 },
];

export const FeedbackCategoriesDetails: React.FC = () => (
  <div className="mt-6 space-y-4">
    {feedbackStats.map((row) => (
      <div className="flex justify-between items-center" key={row.label}>
        <span className="text-sm font-medium">{row.label}</span>
        <span className="text-sm font-medium">{row.value}%</span>
      </div>
    ))}
  </div>
);
