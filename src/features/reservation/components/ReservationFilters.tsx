export default function ReservationFilters() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Filter Reservations</h3>
        <button className="text-sm text-green-900 font-medium">Clear All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date Range</label>
          <select className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-sm focus:border-green-900 focus:ring-green-900">
            <option>Today</option>
            <option>Tomorrow</option>
            <option>This Week</option>
            <option>Next Week</option>
            <option>Custom Range</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-sm focus:border-green-900 focus:ring-green-900">
            <option>All Statuses</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Table Size</label>
          <select className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-sm focus:border-green-900 focus:ring-green-900">
            <option>All Sizes</option>
            <option>1-2 People</option>
            <option>3-4 People</option>
            <option>5-6 People</option>
            <option>7+ People</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Time Slot</label>
          <select className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-sm focus:border-green-900 focus:ring-green-900">
            <option>All Times</option>
            <option>Breakfast (6-10 AM)</option>
            <option>Lunch (11 AM-2 PM)</option>
            <option>Dinner (5-10 PM)</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="w-full bg-green-900 hover:bg-green-900/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
