import React from "react";

const OrderAnalytics: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Order Overview</h3>
                <select className="text-sm border rounded-lg px-3 py-2 bg-gray-50">
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                </select>
            </div>
            <div className="h-[300px] flex flex-col justify-center items-center">
                <div className="w-3/4">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>8 AM</span>
                        <span>10 AM</span>
                        <span>12 PM</span>
                        <span>2 PM</span>
                        <span>4 PM</span>
                        <span>6 PM</span>
                        <span>8 PM</span>
                    </div>
                    <div className="w-full h-40 bg-gray-50 rounded-md flex items-end">
                        <div className="w-1/12 mx-1 bg-green-900 rounded" style={{ height: "20%" }}></div>
                        <div className="w-1/12 mx-1 bg-green-900 rounded" style={{ height: "37%" }}></div>
                        <div className="w-1/12 mx-1 bg-green-900 rounded" style={{ height: "48%" }}></div>
                        <div className="w-1/12 mx-1 bg-green-900 rounded" style={{ height: "32%" }}></div>
                        <div className="w-1/12 mx-1 bg-green-900 rounded" style={{ height: "43%" }}></div>
                        <div className="w-1/12 mx-1 bg-green-900 rounded" style={{ height: "51%" }}></div>
                        <div className="w-1/12 mx-1 bg-green-900 rounded" style={{ height: "27%" }}></div>
                        <div className="flex-1"></div>
                    </div>
                </div>
                <div className="text-center text-gray-400 text-xs mt-3">Static example chart</div>
            </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Order Distribution</h3>
                <select className="text-sm border rounded-lg px-3 py-2 bg-gray-50">
                    <option>By Status</option>
                    <option>By Type</option>
                    <option>By Time</option>
                </select>
            </div>
            <div className="h-[300px] flex flex-col justify-center items-center">
                <div className="relative w-40 h-40">
                    <svg viewBox="0 0 40 40" className="w-full h-full">
                        <circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            stroke="#00674B"
                            strokeWidth="6"
                            strokeDasharray="101"
                            strokeDashoffset="0"
                        />
                        <circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="6"
                            strokeDasharray="32"
                            strokeDashoffset="-101"
                        />
                        <circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="6"
                            strokeDasharray="24"
                            strokeDashoffset="-133"
                        />
                        <circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="6"
                            strokeDasharray="13"
                            strokeDashoffset="-157"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-green-900">76</span>
                        <span className="text-xs text-gray-500">Completed</span>
                    </div>
                </div>
                <div className="mt-4 flex flex-col space-y-1 w-full items-center">
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-green-900 inline-block"></span>
                        <span className="text-xs text-gray-700">Completed</span>
                        <span className="text-xs text-gray-500 ml-1">76</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }}></span>
                        <span className="text-xs text-gray-700">Processing</span>
                        <span className="text-xs text-gray-500 ml-1">24</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: "#3B82F6" }}></span>
                        <span className="text-xs text-gray-700">Preparing</span>
                        <span className="text-xs text-gray-500 ml-1">18</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }}></span>
                        <span className="text-xs text-gray-700">Cancelled</span>
                        <span className="text-xs text-gray-500 ml-1">10</span>
                    </div>
                </div>
                <div className="text-center text-gray-400 text-xs mt-3">Static example chart</div>
            </div>
        </div>
    </div>
);

export default OrderAnalytics;
