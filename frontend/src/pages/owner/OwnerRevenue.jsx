import { useEffect, useState } from "react";

import { getFlightsByOwner } from "../../services/flightService";

import { getBookingsByOwner } from "../../services/bookingService";

import { getPaymentsByOwner } from "../../services/paymentService";

function OwnerRevenue() {

    const [ownerId, setOwnerId] = useState(0);

    const [flights, setFlights] = useState([]);

    const [bookings, setBookings] = useState([]);

    const [payments, setPayments] = useState([]);

    useEffect(() => {

    const id = Number(

        localStorage.getItem("userId")

    );

    if (id) {

        setOwnerId(id);

        loadData(id);

    }

}, []);

    const loadData = async (id) => {

        try {

            const flightResponse =

                await getFlightsByOwner(id);

            const bookingResponse =

                await getBookingsByOwner(id);

            const paymentResponse =

                await getPaymentsByOwner(id);

            setFlights(flightResponse.data);

            setBookings(bookingResponse.data);

            setPayments(paymentResponse.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const totalRevenue = payments.reduce(

        (sum, payment) =>

            sum + payment.amount,

        0

    );

    const averageFare =

        flights.length > 0

            ? flights.reduce(

                  (sum, flight) =>

                      sum + flight.fare,

                  0

              ) / flights.length

            : 0;

    return (

        <div className="container-fluid mt-4">

            <h2 className="fw-bold">

                Owner Revenue Dashboard

            </h2>

            <p className="text-muted">

                Revenue Summary

            </p>

                        <div className="row mt-4 g-4">

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 bg-success text-white">

                        <div className="card-body text-center">

                            <h6>

                                Total Revenue

                            </h6>

                            <h2>

                                ₹ {totalRevenue.toFixed(2)}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 bg-primary text-white">

                        <div className="card-body text-center">

                            <h6>

                                My Flights

                            </h6>

                            <h2>

                                {flights.length}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 bg-warning text-dark">

                        <div className="card-body text-center">

                            <h6>

                                Total Bookings

                            </h6>

                            <h2>

                                {bookings.length}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 bg-info text-white">

                        <div className="card-body text-center">

                            <h6>

                                Average Fare

                            </h6>

                            <h2>

                                ₹ {averageFare.toFixed(2)}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <hr className="my-5" />

                        <div className="row mt-4">

                <div className="col-lg-6">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h5 className="mb-0">

                                Recent Bookings

                            </h5>

                        </div>

                        <div className="card-body">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Flight</th>

                                        <th>Amount</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        bookings.length > 0 ? (

                                            bookings

                                                .slice(0, 5)

                                                .map((booking) => (

                                                    <tr key={booking.bookingId}>

                                                        <td>

                                                            {booking.bookingId}

                                                        </td>

                                                        <td>

                                                            {booking.flight.flightNumber}

                                                        </td>

                                                        <td>

                                                            ₹ {booking.totalAmount}

                                                        </td>

                                                        <td>

                                                            <span
                                                                className={`badge ${
                                                                    booking.bookingStatus === "CONFIRMED"
                                                                        ? "bg-success"
                                                                        : booking.bookingStatus === "PENDING"
                                                                        ? "bg-warning text-dark"
                                                                        : "bg-danger"
                                                                }`}
                                                            >

                                                                {booking.bookingStatus}

                                                            </span>

                                                        </td>

                                                    </tr>

                                                ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center"
                                                >

                                                    No Bookings Found

                                                </td>

                                            </tr>

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow">

                        <div className="card-header bg-success text-white">

                            <h5 className="mb-0">

                                Recent Payments

                            </h5>

                        </div>

                        <div className="card-body">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Booking</th>

                                        <th>Method</th>

                                        <th>Amount</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        payments.length > 0 ? (

                                            payments

                                                .slice(0, 5)

                                                .map((payment) => (

                                                    <tr key={payment.paymentId}>

                                                        <td>

                                                            {payment.paymentId}

                                                        </td>

                                                        <td>

                                                            {payment.booking.bookingId}

                                                        </td>

                                                        <td>

                                                            {payment.paymentMethod}

                                                        </td>

                                                        <td>

                                                            ₹ {payment.amount}

                                                        </td>

                                                    </tr>

                                                ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center"
                                                >

                                                    No Payments Found

                                                </td>

                                            </tr>

                                        )

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>
                        <div className="row mt-4">

                <div className="col-lg-12">

                    <div className="card shadow">

                        <div className="card-header bg-dark text-white">

                            <h5 className="mb-0">

                                Revenue Summary

                            </h5>

                        </div>

                        <div className="card-body">

                            <div className="row text-center">

                                <div className="col-md-4">

                                    <h3 className="text-success">

                                        ₹ {totalRevenue.toFixed(2)}

                                    </h3>

                                    <p>

                                        Total Revenue

                                    </p>

                                </div>

                                <div className="col-md-4">

                                    <h3 className="text-primary">

                                        {payments.length}

                                    </h3>

                                    <p>

                                        Total Payments

                                    </p>

                                </div>

                                <div className="col-md-4">

                                    <h3 className="text-warning">

                                        {bookings.length}

                                    </h3>

                                    <p>

                                        Total Bookings

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default OwnerRevenue;