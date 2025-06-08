type Card = {
  avatar: string;
  name: string;
  phone: string;
  badge: string;
  badgeColor: string;
  date: string;
  time: string;
  guests: string;
  table: string;
};

const cards: Card[] = [
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    name: "Robert Johnson",
    phone: "+1 (555) 123-4567",
    badge: "Tomorrow",
    badgeColor: "bg-blue-100 text-blue-800",
    date: "Jun 8, 2023",
    time: "6:30 PM",
    guests: "5 people",
    table: "Table #10",
  },
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
    name: "James Smith",
    phone: "+1 (555) 987-6543",
    badge: "Jun 9",
    badgeColor: "bg-purple-100 text-purple-800",
    date: "Jun 9, 2023",
    time: "7:00 PM",
    guests: "2 people",
    table: "Table #7",
  },
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    name: "Emily Davis",
    phone: "+1 (555) 456-7890",
    badge: "Jun 10",
    badgeColor: "bg-purple-100 text-purple-800",
    date: "Jun 10, 2023",
    time: "8:30 PM",
    guests: "4 people",
    table: "Table #5",
  },
  {
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    name: "Thomas Wilson",
    phone: "+1 (555) 789-0123",
    badge: "Jun 11",
    badgeColor: "bg-purple-100 text-purple-800",
    date: "Jun 11, 2023",
    time: "7:15 PM",
    guests: "6 people",
    table: "Table #14",
  },
];

export default function UpcomingReservations() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Upcoming Reservations</h3>
          <p className="text-sm text-gray-500">Next 7 days</p>
        </div>
        <div>
          <button className="text-sm text-green-900 font-medium hover:underline">View All</button>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <img className="h-10 w-10 rounded-full mr-3" src={c.avatar} alt="Avatar" />
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-gray-500">{c.phone}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${c.badgeColor}`}>{c.badge}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium">{c.date}</p>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-medium">{c.time}</p>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-xs text-gray-500">Guests</p>
                  <p className="font-medium">{c.guests}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="bg-light text-green-900 text-sm font-medium px-3 py-1 rounded-full">{c.table}</span>
                <div className="flex space-x-2">
                  <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition">
                    Modify
                  </button>
                  <button className="text-sm bg-green-900 text-white hover:bg-green-900/90 px-3 py-1 rounded transition">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
