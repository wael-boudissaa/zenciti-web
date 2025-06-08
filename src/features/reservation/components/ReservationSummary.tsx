export default function ReservationSummary() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold text-lg mb-4">Reservation Summary</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Today's Confirmed</span>
          <span className="font-medium">18</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Today's Pending</span>
          <span className="font-medium">6</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "25%" }}></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">This Week's Total</span>
          <span className="font-medium">87</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-green-900 h-2 rounded-full" style={{ width: "60%" }}></div>
        </div>
        <div className="pt-2">
          <button className="w-full text-center text-green-900 font-medium hover:underline">
            View Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
