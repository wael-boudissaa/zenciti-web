import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/dashboard/pages/HomePage";
import ReservationsPage from "./features/reservation/reservation";
import OrdersPage from "./features/order/order";
import CustomerOrderDetailsPage from "./features/order/customer_order";
import CustomerDetailsPage from "./features/order/customer_details";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reservation" element={<ReservationsPage />} />
            <Route path="/order" element={<OrdersPage />} />
            <Route path="/order/details/:idClient" element={<CustomerOrderDetailsPage />} />
            <Route path="/order/customer" element={<CustomerDetailsPage />} />

        </Routes>
    </BrowserRouter>
);

export default App;
