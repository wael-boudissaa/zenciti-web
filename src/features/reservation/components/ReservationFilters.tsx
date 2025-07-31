import { useState } from "react";

export type FilterState = {
  dateRange: string;
  status: string;
  tableSize: string;
  timeSlot: string;
};

type ReservationFiltersProps = {
  onFiltersChange: (filters: FilterState) => void;
};

export default function ReservationFilters({ onFiltersChange }: ReservationFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "Today",
    status: "All Statuses",
    tableSize: "All Sizes",
    timeSlot: "All Times"
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters: FilterState = {
      dateRange: "Today",
      status: "All Statuses", 
      tableSize: "All Sizes",
      timeSlot: "All Times"
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Filter Reservations</h3>
        <button 
          onClick={handleClearAll}
          className="text-sm text-green-900 font-medium hover:text-green-700 transition"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date Range</label>
          <select 
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-sm focus:border-green-900 focus:ring-green-900"
          >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="This Week">This Week</option>
            <option value="Next Week">Next Week</option>
            <option value="Custom Range">Custom Range</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-sm focus:border-green-900 focus:ring-green-900"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Table Size</label>
          <select 
            value={filters.tableSize}
            onChange={(e) => handleFilterChange('tableSize', e.target.value)}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-sm focus:border-green-900 focus:ring-green-900"
          >
            <option value="All Sizes">All Sizes</option>
            <option value="1-2 People">1-2 People</option>
            <option value="3-4 People">3-4 People</option>
            <option value="5-6 People">5-6 People</option>
            <option value="7+ People">7+ People</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Time Slot</label>
          <select 
            value={filters.timeSlot}
            onChange={(e) => handleFilterChange('timeSlot', e.target.value)}
            className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-sm focus:border-green-900 focus:ring-green-900"
          >
            <option value="All Times">All Times</option>
            <option value="Breakfast (6-10 AM)">Breakfast (6-10 AM)</option>
            <option value="Lunch (11 AM-2 PM)">Lunch (11 AM-2 PM)</option>
            <option value="Dinner (5-10 PM)">Dinner (5-10 PM)</option>
          </select>
        </div>
        <div className="flex items-end">
          <button 
            onClick={handleApplyFilters}
            className="w-full bg-green-900 hover:bg-green-900/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
