import React from "react";

const items = [
  {
    name: "Grilled Salmon",
    type: "Main Course",
    price: "$24.99",
    times: 8,
  },
  {
    name: "Caesar Salad",
    type: "Appetizer",
    price: "$12.50",
    times: 6,
  },
  {
    name: "Chocolate Lava Cake",
    type: "Dessert",
    price: "$8.99",
    times: 5,
  },
];

const FavoriteItems: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b">
      <h3 className="font-bold text-lg">Frequently Ordered Items</h3>
      <p className="text-gray-500 text-sm">Items this customer orders most often</p>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <div className="border rounded-xl p-4" key={i}>
          <div className="flex items-center mb-3">
            <div className="bg-green-900/10 rounded-lg p-3 mr-3">
              <i className="fa-solid fa-utensils text-green-900"></i>
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
            <span className="text-gray-600">Ordered:</span>
            <span className="font-medium">{item.times} times</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FavoriteItems;
