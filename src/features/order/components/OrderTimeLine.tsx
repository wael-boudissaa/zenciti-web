import React from "react";

const timeline = [
  {
    icon: "fa-check",
    bg: "bg-primary500",
    title: "Order Placed",
    time: "June 7, 2023 - 12:42 PM",
    desc: "Customer placed the order through mobile app",
    complete: true,
  },
  {
    icon: "fa-check",
    bg: "bg-primary500",
    title: "Payment Confirmed",
    time: "June 7, 2023 - 12:44 PM",
    desc: "Payment of $74.50 was processed successfully",
    complete: true,
  },
  {
    icon: "fa-utensils",
    bg: "bg-yellow-500",
    title: "Order Preparation",
    time: "June 7, 2023 - 12:50 PM",
    desc: "Kitchen is preparing your order",
    complete: true,
  },
  {
    icon: "fa-box",
    bg: "bg-gray-300",
    title: "Order Ready",
    time: "Pending",
    desc: "",
    complete: false,
    inactive: true,
  },
  {
    icon: "fa-truck",
    bg: "bg-gray-300",
    title: "Out for Delivery",
    time: "Pending",
    desc: "",
    complete: false,
    inactive: true,
  },
];

const OrderTimeline: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
    <div className="p-6 border-b">
      <h3 className="font-bold text-lg">Order Timeline</h3>
      <p className="text-gray-500 text-sm">Track the progress of this order</p>
    </div>
    <div className="p-6">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        {timeline.map((step, idx) => (
          <div className={`relative flex items-start mb-8 ${idx === timeline.length - 1 ? "mb-0" : ""}`} key={idx}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${step.bg} flex items-center justify-center z-10 mr-4`}>
              <i className={`fa-solid ${step.icon} text-white`}></i>
            </div>
            <div>
              <h4 className={`font-medium${step.inactive ? " text-gray-500" : ""}`}>{step.title}</h4>
              <p className="text-gray-500 text-sm">{step.time}</p>
              {step.desc && <p className="text-gray-600 mt-1">{step.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default OrderTimeline;
