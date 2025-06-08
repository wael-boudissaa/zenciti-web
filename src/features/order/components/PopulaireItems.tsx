import React from "react";

const items = [
  {
    rank: 1,
    name: "Grilled Salmon",
    type: "Main Course",
    price: "$24.99",
    orders: "42 today",
    icon: "fa-utensils",
  },
  {
    rank: 2,
    name: "Caesar Salad",
    type: "Appetizer",
    price: "$12.50",
    orders: "36 today",
    icon: "fa-utensils",
  },
  {
    rank: 3,
    name: "Chocolate Lava Cake",
    type: "Dessert",
    price: "$8.99",
    orders: "29 today",
    icon: "fa-utensils",
  },
];

const PopularItems: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Popular Menu Items</h3>
        <select className="text-sm border rounded-lg px-3 py-2 bg-gray-50">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div className="border rounded-xl p-4 relative" key={item.rank}>
          <div className="absolute top-3 right-3">
            <span className="text-xs bg-green-900 text-white px-2 py-1 rounded-full">#{item.rank}</span>
          </div>
          <div className="flex items-center mb-3">
            <div className="bg-green-900/10 rounded-lg p-3 mr-3">
              <i className={`fa-solid ${item.icon} text-green-900`}></i>
            </div>
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-xs text-gray-500">{item.type}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium">{item.price}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Orders:</span>
            <span className="font-medium">{item.orders}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PopularItems;
