import React from "react";

const tabs = ["Profile", "Staff", "Menu", "Floor Plan", "Reviews"];

interface RestaurantTabsProps {
  selected?: string;
  onTabSelect?: (tab: string) => void;
}

export const RestaurantTabs: React.FC<RestaurantTabsProps> = ({
  selected = "Profile",
  onTabSelect,
}) => (
  <div className="flex border-b border-gray-200 mb-6">
    {tabs.map((tab) => (
      <button
        className={`px-6 py-2 font-medium ${
          tab === selected
            ? "border-b-2 border-primary text-primary"
            : "text-gray-500 hover:text-gray-700"
        }`}
        key={tab}
        onClick={() => onTabSelect?.(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);
