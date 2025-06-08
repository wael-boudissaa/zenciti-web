import React from "react";

const OrderActions: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b">
      <h3 className="font-bold text-lg">Actions</h3>
    </div>
    <div className="p-6 flex flex-wrap gap-4">
      <button className="px-4 py-2 bg-green-900 text-white rounded-lg flex items-center">
        <i className="fa-solid fa-check mr-2"></i>
        Mark as Ready
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
        <i className="fa-solid fa-truck mr-2"></i>
        Assign Delivery
      </button>
      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center">
        <i className="fa-solid fa-pen-to-square mr-2"></i>
        Edit Order
      </button>
      <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg flex items-center">
        <i className="fa-solid fa-times mr-2"></i>
        Cancel Order
      </button>
    </div>
  </div>
);

export default OrderActions;
