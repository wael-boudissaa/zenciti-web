import React from "react";

const OrderSummary: React.FC = () => (
  <div className="flex flex-wrap">
    <div className="w-full lg:w-2/3 pr-0 lg:pr-8">
      <div className="flex items-center mb-6">
        <img className="h-16 w-16 rounded-full mr-6" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Customer Avatar" />
        <div>
          <h2 className="text-xl font-bold mb-1">Lindsey Stroud</h2>
          <div className="flex items-center text-gray-500 space-x-4">
            <div className="flex items-center">
              <i className="fa-solid fa-envelope mr-2"></i>
              <span>lindsey.stroud@example.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="font-medium">#ORD-7256</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Date &amp; Time</p>
          <p className="font-medium">June 7, 2023</p>
          <p className="text-sm text-gray-500">12:42 PM</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Payment Method</p>
          <p className="font-medium">Credit Card</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Processing</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Delivery Address</p>
          <p className="font-medium">Lindsey Stroud</p>
          <p className="text-gray-700">123 Main Street</p>
          <p className="text-gray-700">Apt 4B</p>
          <p className="text-gray-700">New York, NY 10001</p>
          <p className="text-gray-700">United States</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Contact Information</p>
          <p className="flex items-center text-gray-700 mb-1">
            <i className="fa-solid fa-phone mr-2 text-gray-500"></i>
            (123) 456-7890
          </p>
          <p className="flex items-center text-gray-700">
            <i className="fa-solid fa-envelope mr-2 text-gray-500"></i>
            lindsey.stroud@example.com
          </p>
        </div>
      </div>
    </div>
    <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">$62.48</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">$5.99</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">$6.03</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-200">
            <span className="font-bold">Total</span>
            <span className="font-bold">$74.50</span>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full bg-green-900 text-white py-2 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-print mr-2"></i>
            Print Receipt
          </button>
          <button className="w-full border border-green-900 text-green-900 py-2 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-envelope mr-2"></i>
            Email Receipt
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default OrderSummary;
