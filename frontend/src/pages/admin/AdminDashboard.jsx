import { useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";

import { getUsers } from "../../services/userService";
import { getFlights } from "../../services/flightService";
import { getBookings } from "../../services/bookingService";
import { getPayments } from "../../services/paymentService";
import { getRefunds } from "../../services/refundService";

import "../../assets/styles/dashboard/StatCard.css";

function AdminDashboard() {

    const [counts, setCounts] = useState({

    users: 0,
    owners: 0,
    flights: 0,
    bookings: 0,
    payments: 0,
    revenue: 0,
    pendingRefunds: 0

});

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const [

    users,
    flights,
    bookings,
    payments,
    refunds

] = await Promise.all([

    getUsers(),
    getFlights(),
    getBookings(),
    getPayments(),
    getRefunds()

]);
            const ownerCount = users.data.filter(

    user => user.role === "FLIGHT_OWNER"

).length;

const revenue = payments.data

    .filter(payment => payment.paymentStatus === "SUCCESS")

    .reduce(

        (sum, payment) => sum + payment.amount,

        0

    );

const pendingRefunds = refunds.data.filter(

    refund => refund.refundStatus === "PENDING"

).length;

setCounts({

    users: users.data.length,

    owners: ownerCount,

    flights: flights.data.length,

    bookings: bookings.data.length,

    payments: payments.data.length,

    revenue,

    pendingRefunds

});

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    marginLeft: "250px",
                    background: "#f4f7fc",
                    minHeight: "100vh"
                }}
            >

                <Topbar />

                <div style={{ padding: "40px" }}>

                    <h1>

                        Welcome Admin 👋

                    </h1>

                    <p>

                        Manage your airline system efficiently.

                    </p>

                    <div className="stat-grid">

                        <StatCard
                            title="Total Users"
                            value={counts.users}
                            color="#0d6efd"
                        />

                        <StatCard
                            title="Flights"
                            value={counts.flights}
                            color="#20c997"
                        />

                        <StatCard
                            title="Bookings"
                            value={counts.bookings}
                            color="#fd7e14"
                        />

                        <StatCard
                            title="Payments"
                            value={counts.payments}
                            color="#dc3545"
                        />
                        <StatCard

    title="Flight Owners"

    value={counts.owners}

    color="#6610f2"

/>

<StatCard

    title="Revenue"

    value={`₹ ${counts.revenue}`}

    color="#198754"

/>

<StatCard

    title="Pending Refunds"

    value={counts.pendingRefunds}

    color="#dc3545"

/>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;