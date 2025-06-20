import React, { useState } from "react";

const tabs = ["Profile", "Staff", "Menu"];

interface RestaurantTabsProps {
    selected?: string;
    onTabSelect?: (tab: string) => void;
}

export const RestaurantTabs: React.FC<RestaurantTabsProps> = ({
    selected = "Profile",
    onTabSelect,
}) => {
    const [internalSelected, setInternalSelected] = useState(selected);

    const handleSelect = (tab: string) => {
        setInternalSelected(tab);
        onTabSelect?.(tab);
    };

    return (
        <div className="flex border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
                <button
                    className={`px-6 py-2 font-medium ${tab === internalSelected
                        ? "border-b-2 border-primary text-primary"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    key={tab}
                    onClick={() => handleSelect(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};
