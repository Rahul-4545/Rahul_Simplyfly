import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {

    getBookingsByUser

} from "../../services/bookingService";

import "./UserDashboard.css";

function UserDashboard() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState(0);

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const userName = localStorage.getItem("name") || "Traveller";

    useEffect(() => {

        const id = Number(

            localStorage.getItem("userId")

        );

        if (id) {

            setUserId(id);

            loadBookings(id);

        }

    }, []);

    const loadBookings = async (id) => {

        try {

            setLoading(true);

            const response = await getBookingsByUser(id);

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const totalBookings = bookings.length;

    const confirmedBookings = bookings.filter(

        booking =>

            booking.bookingStatus === "CONFIRMED"

    ).length;

    const cancelledBookings = bookings.filter(

        booking =>

            booking.bookingStatus === "CANCELLED"

    ).length;

    const totalSpent = bookings.reduce(

        (sum, booking) =>

            sum + booking.totalAmount,

        0

    );

    const upcomingTrip = bookings.find(

        booking =>

            booking.bookingStatus === "CONFIRMED"

    );
        if (loading) {

        return (

            <div className="dashboard-loading">

                <div className="spinner-border text-primary">

                </div>

                <h4 className="mt-3">

                    Loading Dashboard...

                </h4>

            </div>

        );

    }

    return (

        <div className="dashboard-page">

            {/* HERO SECTION */}

            <div className="hero-banner">

                <div className="row align-items-center">

                    <div className="col-lg-8">

                        <h2>

                            Welcome Back,

                            <span className="hero-name">

                                {" "}

                                {userName}

                            </span>

                            👋

                        </h2>

                        <p>

                            Manage your trips, bookings and payments
                            from one place. Wishing you a pleasant
                            journey with SimplyFly.

                        </p>

                    </div>

                    <div className="col-lg-4 text-end">

                        <div className="hero-plane">

                            ✈

                        </div>

                    </div>

                </div>

            </div>

            {/* DASHBOARD STATS */}

            <div className="row g-4 mb-5">

                <div className="col-lg-3 col-md-6">

                    <div className="stats-card bg-primary text-white">

                        <div>

                            <h6>

                                Total Bookings

                            </h6>

                            <h2>

                                {totalBookings}

                            </h2>

                        </div>

                        <div className="stats-icon">

                            📖

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="stats-card bg-success text-white">

                        <div>

                            <h6>

                                Confirmed Trips

                            </h6>

                            <h2>

                                {confirmedBookings}

                            </h2>

                        </div>

                        <div className="stats-icon">

                            ✈

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="stats-card bg-warning">

                        <div>

                            <h6>

                                Total Spent

                            </h6>

                            <h2>

                                ₹ {totalSpent}

                            </h2>

                        </div>

                        <div className="stats-icon">

                            💰

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="stats-card bg-danger text-white">

                        <div>

                            <h6>

                                Cancelled

                            </h6>

                            <h2>

                                {cancelledBookings}

                            </h2>

                        </div>

                        <div className="stats-icon">

                            ❌

                        </div>

                    </div>

                </div>

            </div>

            {/* QUICK ACTIONS */}

            <h4 className="section-title">

                Quick Actions

            </h4>

            <div className="row g-4 mb-5">

                <div className="col-lg-3 col-md-6">

                    <div

                        className="quick-card"

                        onClick={() =>

                            navigate("/user/search")

                        }

                    >

                        <div className="quick-icon">

                            🔍

                        </div>

                        <h5>

                            Search Flights

                        </h5>

                        <p>

                            Find your next journey

                        </p>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div

                        className="quick-card"

                        onClick={() =>

                            navigate("/user/bookings")

                        }

                    >

                        <div className="quick-icon">

                            📖

                        </div>

                        <h5>

                            My Bookings

                        </h5>

                        <p>

                            View booking history

                        </p>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div

                        className="quick-card"

                        onClick={() =>

                            navigate("/user/payments")

                        }

                    >

                        <div className="quick-icon">

                            💳

                        </div>

                        <h5>

                            Payments

                        </h5>

                        <p>

                            Manage your payments

                        </p>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div

                        className="quick-card"

                        onClick={() =>

                            navigate("/user/refunds")

                        }

                    >

                        <div className="quick-icon">

                            💵

                        </div>

                        <h5>

                            Refunds

                        </h5>

                        <p>

                            Track refund requests

                        </p>

                    </div>

                </div>

            </div>

            {/* UPCOMING TRIP */}

            {

                upcomingTrip &&

                (

                    <div className="upcoming-card mb-5">

                        <h4>

                            🛫 Upcoming Trip

                        </h4>

                        <div className="row mt-3">

                            <div className="col-md-3">

                                <strong>

                                    Flight

                                </strong>

                                <br />

                                {upcomingTrip.flight.flightName}

                            </div>

                            <div className="col-md-3">

                                <strong>

                                    Route

                                </strong>

                                <br />

                                {upcomingTrip.flight.origin}

                                {" → "}

                                {upcomingTrip.flight.destination}

                            </div>

                            <div className="col-md-3">

                                <strong>

                                    Departure

                                </strong>

                                <br />

                                {upcomingTrip.flight.departureTime}

                            </div>

                            <div className="col-md-3">

                                <strong>

                                    Fare

                                </strong>

                                <br />

                                ₹ {upcomingTrip.totalAmount}

                            </div>

                        </div>

                    </div>

                )

            }

            {/* RECENT BOOKINGS */}

            <div className="card booking-table">

                <div className="card-header">

                    <h5 className="mb-0">

                        🛫 Recent Bookings

                    </h5>

                </div>

                <div className="card-body">
                                        <table className="table table-hover align-middle">

                        <thead className="table-primary">

                            <tr>

                                <th>Booking ID</th>

                                <th>Flight</th>

                                <th>Origin</th>

                                <th>Destination</th>

                                <th>Amount</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                bookings.length > 0

                                ?

                                (

                                    bookings.map((booking) => (

                                        <tr

                                            key={booking.bookingId}

                                        >

                                            <td>

                                                #{booking.bookingId}

                                            </td>

                                            <td>

                                                {booking.flight.flightName}

                                                <br/>

                                                <small className="text-muted">

                                                    {

                                                        booking.flight.flightNumber

                                                    }

                                                </small>

                                            </td>

                                            <td>

                                                {booking.flight.origin}

                                            </td>

                                            <td>

                                                {booking.flight.destination}

                                            </td>

                                            <td>

                                                <strong>

                                                    ₹ {booking.totalAmount}

                                                </strong>

                                            </td>

                                            <td>

                                                {

                                                    booking.bookingStatus === "CONFIRMED"

                                                    ?

                                                    (

                                                        <span className="badge bg-success">

                                                            Confirmed

                                                        </span>

                                                    )

                                                    :

                                                    booking.bookingStatus === "PENDING"

                                                    ?

                                                    (

                                                        <span className="badge bg-warning text-dark">

                                                            Pending

                                                        </span>

                                                    )

                                                    :

                                                    (

                                                        <span className="badge bg-danger">

                                                            Cancelled

                                                        </span>

                                                    )

                                                }

                                            </td>

                                        </tr>

                                    ))

                                )

                                :

                                (

                                    <tr>

                                        <td

                                            colSpan="6"

                                            className="text-center py-5"

                                        >

                                            <div style={{fontSize:"60px"}}>

                                                ✈

                                            </div>

                                            <h5 className="mt-3">

                                                No Bookings Yet

                                            </h5>

                                            <p className="text-muted">

                                                Search for flights and book your first journey.

                                            </p>

                                            <button

                                                className="btn btn-primary"

                                                onClick={() =>

                                                    navigate("/user/search")

                                                }

                                            >

                                                Search Flights

                                            </button>

                                        </td>

                                    </tr>

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default UserDashboard;