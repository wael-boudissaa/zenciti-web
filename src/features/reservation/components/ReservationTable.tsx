type Reservation = {
  avatar: string;
  name: string;
  email: string;
  time: string;
  meal: string;
  table: string;
  guests: string;
  special: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  statusColor: string;
};

const reservations: Reservation[] = [
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    name: "Lindsey Stroud",
    email: "lindsey.stroud@gmail.com",
    time: "12:30 PM",
    meal: "Lunch",
    table: "Table #4",
    guests: "2 people",
    special: "Window seat preferred",
    status: "Confirmed",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    name: "Michael Chen",
    email: "michael.chen@gmail.com",
    time: "1:00 PM",
    meal: "Lunch",
    table: "Table #8",
    guests: "4 people",
    special: "Business meeting, quiet area",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    name: "Sarah Rodriguez",
    email: "sarah.r@gmail.com",
    time: "7:00 PM",
    meal: "Dinner",
    table: "Table #12",
    guests: "6 people",
    special: "Birthday celebration, need cake at 8 PM",
    status: "Confirmed",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    name: "David Kim",
    email: "david.kim@gmail.com",
    time: "7:30 PM",
    meal: "Dinner",
    table: "Table #6",
    guests: "2 people",
    special: "Anniversary dinner, romantic setup",
    status: "Confirmed",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
    name: "Jennifer Lopez",
    email: "jen.lopez@gmail.com",
    time: "8:00 PM",
    meal: "Dinner",
    table: "Table #15",
    guests: "8 people",
    special: "Family dinner, need high chair for toddler",
    status: "Confirmed",
    statusColor: "bg-green-100 text-green-800",
  },
];

export default function ReservationTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Today's Reservations</h3>
          <p className="text-sm text-gray-500">June 7, 2023</p>
        </div>
        <div className="flex space-x-2">
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center transition">
            <i className="fa-solid fa-download mr-2"></i>
            Export
          </button>
          <button className="text-sm bg-green-900 text-white hover:bg-green-900/90 px-4 py-2 rounded-lg flex items-center transition">
            <i className="fa-solid fa-plus mr-2"></i>
            Add New
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Special Requests</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full mr-3" src={r.avatar} alt="Avatar" />
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-gray-500 text-sm">{r.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{r.time}</div>
                  <div className="text-gray-500 text-sm">{r.meal}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-light text-green-900 text-sm font-medium px-3 py-1 rounded-full">{r.table}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <i className="fa-solid fa-user mr-2 text-gray-500"></i>
                    <span>{r.guests}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="max-w-xs truncate">{r.special}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${r.statusColor} font-medium`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-green-900 transition">
                      <i className="fa-solid fa-edit"></i>
                    </button>
                    <button className="text-gray-500 hover:text-red-500 transition">
                      <i className="fa-solid fa-trash-alt"></i>
                    </button>
                    <button className="text-gray-500 hover:text-blue-500 transition">
                      <i className="fa-solid fa-phone"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 5 of 24 reservations</p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button className="px-3 py-1 rounded bg-green-900 text-white">1</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">2</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">3</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
