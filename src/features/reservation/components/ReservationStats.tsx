import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarWeek,
  faUsers,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const stats = [
  {
    icon: faCalendarDay,
    label: "Today's Reservations",
    value: 24,
  },
  {
    icon: faCalendarWeek,
    label: "Upcoming (7 Days)",
    value: 87,
  },
  {
    icon: faUsers,
    label: "Total Guests Today",
    value: 68,
  },
  {
    icon: faCheckCircle,
    label: "Confirmed Rate",
    value: "92%",
  },
];

export default function ReservationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-center">
          <div className="bg-light rounded-lg p-3 mr-4">
            <FontAwesomeIcon icon={stat.icon} className="text-green-900 text-xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

