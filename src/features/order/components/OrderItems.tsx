import React from "react";

const items = [
  {
    icon: "fa-utensils",
    name: "Grilled Salmon",
    desc: "Fresh Atlantic salmon fillet, grilled to perfection with lemon butter sauce, served with seasonal vegetables and rice pilaf.",
    tag: "Main Course",
    instructions: "No onions, extra lemon",
    quantity: 2,
    price: "$49.98",
    unit: "$24.99 each",
  },
  {
    icon: "fa-leaf",
    name: "Caesar Salad",
    desc: "Crisp romaine lettuce, garlic croutons, parmesan cheese, and our house-made Caesar dressing.",
    tag: "Appetizer",
    instructions: "Dressing on the side",
    quantity: 1,
    price: "$12.50",
    unit: "",
  },
  {
    icon: "fa-cookie",
    name: "Chocolate Lava Cake",
    desc: "Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.",
    tag: "Dessert",
    instructions: "None",
    quantity: 1,
    price: "$8.99",
    unit: "",
  },
];

const OrderItems: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
    <div className="p-6 border-b">
      <h3 className="font-bold text-lg">Order Items</h3>
      <p className="text-gray-500 text-sm">Items included in this order</p>
    </div>
    <div className="p-6">
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className={`flex flex-col sm:flex-row ${i < items.length - 1 ? "border-b border-gray-200 pb-6" : ""}`}>
            <div className="sm:w-1/6 mb-4 sm:mb-0">
              <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <i className={`fa-solid ${item.icon} text-2xl text-green-900`}></i>
              </div>
            </div>
            <div className="sm:w-3/6">
              <h4 className="font-bold text-lg">{item.name}</h4>
              <p className="text-gray-600 mb-2">{item.desc}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <i className="fa-solid fa-tag mr-2"></i>
                <span>{item.tag}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <i className="fa-solid fa-utensils mr-2"></i>
                <span>Special Instructions: {item.instructions}</span>
              </div>
            </div>
            <div className="sm:w-1/6 text-center mt-4 sm:mt-0">
              <p className="text-gray-500 mb-1">Quantity</p>
              <p className="font-bold text-lg">{item.quantity}</p>
            </div>
            <div className="sm:w-1/6 text-center mt-4 sm:mt-0">
              <p className="text-gray-500 mb-1">Price</p>
              <p className="font-bold text-lg">{item.price}</p>
              {item.unit && <p className="text-sm text-gray-500">({item.unit})</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default OrderItems;
