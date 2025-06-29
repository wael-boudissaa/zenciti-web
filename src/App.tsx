import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./features/dashboard/pages/HomePage";
import { ToastContainer } from 'react-toastify';

import ReservationsPage from "./features/reservation/reservation";
import OrdersPage from "./features/order/order";
import CustomerOrderDetailsPage from "./features/order/customer_order";
import CustomerDetailsPage from "./features/order/customer_details";
import RestaurantProfilePage from "./features/restaurant/restaurant";
import { AuthProvider, ProtectedRoute, SignInRoute } from "./app/context";
import TableDesignerPage from "./features/dashboard/pages/TableLayout";


const App: React.FC = () => (
    <AuthProvider>
        <BrowserRouter>
            <ToastContainer />

            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/table"
                    element={
                        <ProtectedRoute>
                            <TableDesignerPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reservation"
                    element={
                        <ProtectedRoute>
                            <ReservationsPage />
                        </ProtectedRoute>
                    }
                />
                {/* <Route */}
                {/*     path="/reservation/details" */}
                {/*     element={ */}
                {/*         <ProtectedRoute> */}
                {/*             <ReservationDetailsPage /> */}
                {/*         </ProtectedRoute> */}
                {/*     } */}
                {/* /> */}

                <Route
                    path="/order"
                    element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/order/details/:idClient"
                    element={
                        <ProtectedRoute>
                            <CustomerOrderDetailsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/order/customer/:idOrder"
                    element={
                        <ProtectedRoute>
                            <CustomerDetailsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/restaurant"
                    element={
                        <ProtectedRoute>
                            <RestaurantProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/signin" element={<SignInRoute />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default App;
