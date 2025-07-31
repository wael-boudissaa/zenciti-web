import React from "react";
import type { StatusStats } from "../hooks/hoos_order_page";

interface Props {
  loading: boolean;
  statusStats?: StatusStats;
}

const OrderStats: React.FC<Props> = ({ loading, statusStats }) => {
  const totalOrders = statusStats
    ? Object.values(statusStats).reduce((a, b) => a + b, 0)
    : 0;
  const pending = statusStats?.pending || 0;
  const completed = statusStats?.completed || 0;
  const cancelled = statusStats?.cancelled || 0;

  const cards = [
    { icon: "fa-clipboard-list", label: "Total Orders", value: totalOrders },
    { icon: "fa-clock", label: "Pending Orders", value: pending },
    { icon: "fa-check-circle", label: "Completed Orders", value: completed },
    { icon: "fa-ban", label: "Cancelled Orders", value: cancelled }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((c, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-light rounded-lg p-3">
              <i className={`fa-solid ${c.icon} text-primary text-xl`}></i>
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Today</span>
          </div>
          <h2 className="text-3xl font-bold mb-1">{loading ? "..." : c.value}</h2>
          <p className="text-gray-600">{c.label}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;
