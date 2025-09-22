import React from "react";

export interface FrequentlyOrderedItem {
  idFood: string;
  name: string;
  description: string;
  price: number;
  image: string;
  totalOrdered: number;
}

interface FavoriteItemsProps {
  items: FrequentlyOrderedItem[];
}

const FavoriteItems: React.FC<FavoriteItemsProps> = ({ items }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b">
      <h3 className="font-bold text-lg">Frequently Ordered Items</h3>
      <p className="text-gray-500 text-sm">Items this customer orders most often</p>
    </div>
    <div className="p-6">
      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-utensils text-gray-400 text-xl"></i>
          </div>
          <h4 className="font-medium text-gray-600 mb-2">No Order History</h4>
          <p className="text-sm text-gray-500">This customer hasn't placed any completed orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div className="border rounded-xl p-4" key={item.idFood}>
              <div className="flex items-center mb-3">
                <div className="bg-primary/10 rounded-lg p-3 mr-3">
                  <i className="fa-solid fa-utensils text-green-900"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Ordered:</span>
                <span className="font-medium">{item.totalOrdered} times</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default FavoriteItems;
