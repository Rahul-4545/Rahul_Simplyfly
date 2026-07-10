import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import UserLayout from "../layouts/UserLayout";

import Home from "../pages/shared/Home";
import About from "../pages/shared/About";
import Contact from "../pages/shared/Contact";
import NotFound from "../pages/shared/NotFound";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageFlights from "../pages/admin/ManageFlights";
import ManageBookings from "../pages/admin/ManageBookings";
import ManagePayments from "../pages/admin/ManagePayments";
import ManageRefunds from "../pages/admin/ManageRefunds";
import Reports from "../pages/admin/Reports";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import MyFlights from "../pages/owner/MyFlights";
import OwnerManageSeats from "../pages/owner/OwnerManageSeats";
import MyBookings from "../pages/owner/MyBookings";
import OwnerRevenue from "../pages/owner/OwnerRevenue";

import UserDashboard from "../pages/user/UserDashboard";
import SearchFlights from "../pages/user/SearchFlights";
import UserBookings from "../pages/user/UserBookings";
import UserPayments from "../pages/user/UserPayments";

import BookFlight from "../pages/user/BookFlight";
import PaymentPage from "../pages/user/PaymentPage";
import RequestRefund from "../pages/user/RequestRefund";
import UserRefunds from "../pages/user/UserRefunds";
import OwnerRefunds from "../pages/owner/OwnerRefunds";
import ForgotPassword from "../pages/auth/ForgotPassword";

function AppRoutes() {

    return (

        <Routes>

            {/* Public Pages */}

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

            </Route>

            {/* Authentication */}

            <Route
                path="/login"
                element={<Login />}
            />
<Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>
            <Route
                path="/register"
                element={<Register />}
            />

            {/* ================= ADMIN ================= */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManageUsers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/flights"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManageFlights />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/bookings"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManageBookings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/payments"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManagePayments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/refunds"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <ManageRefunds />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/reports"
                element={
                    <ProtectedRoute allowedRole="ADMIN">
                        <Reports />
                    </ProtectedRoute>
                }
            />

            {/* ================= OWNER ================= */}

            <Route
                path="/owner"
                element={
                    <ProtectedRoute allowedRole="FLIGHT_OWNER">
                        <OwnerLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="dashboard"
                    element={<OwnerDashboard />}
                />

                <Route
                    path="flights"
                    element={<MyFlights />}
                />

                <Route
                    path="seats"
                    element={<OwnerManageSeats />}
                />

                <Route
                    path="bookings"
                    element={<MyBookings />}
                />
<Route
    path="refunds"
    element={<OwnerRefunds />}
/>
                <Route
                    path="revenue"
                    element={<OwnerRevenue />}
                />

            </Route>

            {/* ================= USER ================= */}

            <Route
                path="/user"
                element={
                    <ProtectedRoute allowedRole="USER">
                        <UserLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="dashboard"
                    element={<UserDashboard />}
                />

                <Route
                    path="search"
                    element={<SearchFlights />}
                />
                    
                    <Route
    path="book"
    element={<BookFlight />}
/>

                <Route
                    path="bookings"
                    element={<UserBookings />}
                />
                <Route
    path="pay"
    element={<PaymentPage />}
/>

<Route
        path="refund-request"
        element={<RequestRefund />}
    />
                <Route
                    path="payments"
                    element={<UserPayments />}
                />
                
                

                <Route
                    path="refunds"
                    element={<UserRefunds />}
                />

            </Route>

            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default AppRoutes;
