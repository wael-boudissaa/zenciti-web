export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
          <div className="flex items-center">
            <div className="bg-green-900/10 p-2 rounded-lg mr-3">
              <i className="fa-solid fa-plus text-green-900"></i>
            </div>
            <span>New Reservation</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-400"></i>
        </button>
        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
          <div className="flex items-center">
            <div className="bg-green-900/10 p-2 rounded-lg mr-3">
              <i className="fa-solid fa-message text-green-900"></i>
            </div>
            <span>Send Reminder</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-400"></i>
        </button>
        <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
          <div className="flex items-center">
            <div className="bg-green-900/10 p-2 rounded-lg mr-3">
              <i className="fa-solid fa-table text-green-900"></i>
            </div>
            <span>Manage Tables</span>
          </div>
          <i className="fa-solid fa-chevron-right text-gray-400"></i>
        </button>
      </div>
    </div>
  );
}
