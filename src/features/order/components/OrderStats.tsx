import React from "react";

const cards = [
  {
    icon: "fa-clipboard-list",
    label: "Total Orders",
    value: 128,
    tag: "Today",
  },
  {
    icon: "fa-clock",
    label: "Pending Orders",
    value: 42,
    tag: "Today",
  },
  {
    icon: "fa-check-circle",
    label: "Completed Orders",
    value: 76,
    tag: "Today",
  },
  {
    icon: "fa-ban",
    label: "Cancelled Orders",
    value: 10,
    tag: "Today",
  },
];

const OrderStats: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {cards.map((c, i) => (
      <div key={i} className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-light rounded-lg p-3">
            <i className={`fa-solid ${c.icon} text-green-900 text-xl`}></i>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{c.tag}</span>
        </div>
        <h2 className="text-3xl font-bold mb-1">{c.value}</h2>
        <p className="text-gray-600">{c.label}</p>
      </div>
    ))}
  </div>
);

export default OrderStats;
