
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faTable } from "@fortawesome/free-solid-svg-icons";

const tables = [
  {
    id: 1,
    name: "Table #1",
    desc: "Window View",
    capacity: 4,
    status: "Available",
    statusColor: "green",
  },
  {
    id: 2,
    name: "Table #2",
    desc: "Center Area",
    capacity: 6,
    status: "Reserved",
    statusColor: "red",
  },
  {
    id: 3,
    name: "Table #3",
    desc: "Near Kitchen",
    capacity: 2,
    status: "Available",
    statusColor: "green",
  },
];

const TableAvailability: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Table Availability</h3>
        <div className="flex space-x-2">
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">Today</button>
          <button className="text-sm bg-green-900 text-white hover:bg-green-900/90 px-4 py-2 rounded-lg flex items-center">
            <FontAwesomeIcon icon={faTableCells} className="mr-2" />
            View Floor Plan
          </button>
        </div>
      </div>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {tables.map((t) => (
        <div className="border rounded-xl p-4 relative" key={t.id}>
          <div className="absolute top-3 right-3">
            <span className={`h-3 w-3 bg-${t.statusColor}-500 rounded-full inline-block`}></span>
          </div>
          <div className="flex items-center mb-3">
            <div className="bg-green-900/10 rounded-lg p-3 mr-3">
              <FontAwesomeIcon icon={faTable} className="text-green-900" />
            </div>
            <div>
              <h4 className="font-medium">{t.name}</h4>
              <p className="text-xs text-gray-500">{t.desc}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Capacity:</span>
            <span className="font-medium">{t.capacity} people</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Status:</span>
            <span className={`text-${t.statusColor}-600 font-medium`}>{t.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TableAvailability;
