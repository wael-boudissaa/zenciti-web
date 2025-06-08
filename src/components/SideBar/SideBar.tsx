import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUtensils,
    faClipboardList,
    faCalendarCheck,
    faUsers,
    faChartLine,
    faGear,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const links = [
    { icon: faHome, label: "Dashboard", path: "/" },
    { icon: faUtensils, label: "Restaurant", path: "/restaurant" },
    { icon: faClipboardList, label: "Orders", path: "/order" },
    { icon: faCalendarCheck, label: "Reservations", path: "/reservation" },
    { icon: faUsers, label: "Customers", path: "/customers" },
    { icon: faChartLine, label: "Analytics", path: "/analytics" },
];

const settings = [
    { icon: faGear, label: "Settings", path: "/settings" },
    { icon: faSignOutAlt, label: "Logout", path: "/logout" },
];

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="w-64 min-h-screen bg-green-900 text-white flex flex-col">
            <div className="p-6 border-b border-green-900-700">
                <h1 className="text-3xl font-bold tracking-wider">ZENCITI</h1>
            </div>
            <nav className="flex-1 py-6 flex flex-col">
                <div className="px-4 space-y-2 flex-1">
                    {links.map((link) => {
                        const active = location.pathname === link.path;
                        return (
                            <span
                                key={link.label}
                                className={`flex items-center p-3 rounded-lg ${active
                                        ? "bg-white bg-opacity-10 text-black"
                                        : "hover:bg-white hover:bg-opacity-10 hover:text-black transition duration-200"
                                    } cursor-pointer`}
                                onClick={() => navigate(link.path)}
                            >
                                <FontAwesomeIcon icon={link.icon} className="text-xl w-8" />
                                <span className="font-medium">{link.label}</span>
                            </span>
                        );
                    })}
                </div>
                <div className="mt-auto px-4 py-6">
                    {settings.map((item) => (
                        <span
                            key={item.label}
                            className="flex items-center p-3 rounded-lg hover:bg-white hover:text-black hover:bg-opacity-10 text-white transition duration-200 cursor-pointer"
                            onClick={() => navigate(item.path)}
                        >
                            <FontAwesomeIcon icon={item.icon} className="text-xl w-8" />
                            <span className="font-medium">{item.label}</span>
                        </span>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
