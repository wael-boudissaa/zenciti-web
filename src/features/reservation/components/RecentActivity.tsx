const activities = [
  {
    icon: "fa-check",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Reservation confirmed",
    desc: "Sarah Rodriguez for tonight at 7:00 PM",
    time: "10 minutes ago",
  },
  {
    icon: "fa-edit",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    title: "Reservation modified",
    desc: "Michael Chen changed from 4 to 6 guests",
    time: "45 minutes ago",
  },
  {
    icon: "fa-times",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    title: "Reservation cancelled",
    desc: "Amanda Lee for tomorrow at 8:00 PM",
    time: "2 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex">
            <div className="mr-3 relative">
              <div className={`h-8 w-8 rounded-full ${a.iconBg} flex items-center justify-center`}>
                <i className={`fa-solid ${a.icon} ${a.iconColor}`}></i>
              </div>
              {i < activities.length - 1 && (
                <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-200"></div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{a.title}</p>
              <p className="text-xs text-gray-500">{a.desc}</p>
              <p className="text-xs text-gray-400">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
