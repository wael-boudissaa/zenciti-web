import React from "react";

export const FeedbackCategoriesChart: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-[300px]">
    {/* SVG Doughnut Chart */}
    <svg viewBox="0 0 42 42" width="180" height="180">
      {/* Each circle is a segment: stroke-dasharray = percent, 100 - percent */}
      <circle
        r="16"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#E6F4F1"
        strokeWidth="8"
        strokeDasharray="68 100"
        strokeDashoffset="0"
      />
      <circle
        r="16"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#64B5F6"
        strokeWidth="8"
        strokeDasharray="10 100"
        strokeDashoffset="-68"
      />
      <circle
        r="16"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#FFB74D"
        strokeWidth="8"
        strokeDasharray="8 100"
        strokeDashoffset="-78"
      />
      <circle
        r="16"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#00A67E"
        strokeWidth="8"
        strokeDasharray="12 100"
        strokeDashoffset="-86"
      />
      <circle
        r="16"
        cx="21"
        cy="21"
        fill="transparent"
        stroke="#00674B"
        strokeWidth="8"
        strokeDasharray="2 100"
        strokeDashoffset="-98"
      />
      {/* Center label */}
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="7" fill="#00674B" fontWeight="bold">
        Feedback
      </text>
    </svg>
    {/* Legend */}
    <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ background: "#E6F4F1" }} /> Atmosphere
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ background: "#64B5F6" }} /> Cleanliness
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ background: "#FFB74D" }} /> Value for Money
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ background: "#00A67E" }} /> Food Quality
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ background: "#00674B" }} /> Service Quality
      </div>
    </div>
  </div>
);
