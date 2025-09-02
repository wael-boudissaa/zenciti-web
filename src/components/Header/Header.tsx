import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../app/context";

const Header: React.FC = () => {
    const { user } = useAuth();
    return (
        <header className="bg-white p-6 shadow-sm flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Restaurant Dashboard</h1>
                <p className="text-gray-500">Welcome back, manage your restaurant efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    {/* <FontAwesomeIcon icon={faBell} className="text-gray-600 text-xl" /> */}
                    {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span> */}
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">IR</div>
                    <div>
                        <p className="font-medium text-gray-800">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
