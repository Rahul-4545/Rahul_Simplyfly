import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {

    getBookingsByUser,
    

} from "../../services/bookingService";

import { paymentExists } from "../../services/paymentService";

function UserBookings() {

    const [bookings, setBookings] = useState([]);

    const [userId, setUserId] = useState(0);

    const [searchStatus, setSearchStatus] = useState("");

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [paidBookings, setPaidBookings] = useState({});
    const navigate = useNavigate();

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

            const response = await getBookingsByUser(id);

            setBookings(response.data);

const paidStatus = {};

for (const booking of response.data) {

    try {

        const res = await paymentExists(

            booking.bookingId

        );

        paidStatus[booking.bookingId] =

            res.data;

    }

    catch {

        paidStatus[booking.bookingId] = false;

    }

}

setPaidBookings(paidStatus);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSearch = () => {

        if (searchStatus === "") {

            loadBookings(userId);

            return;

        }

        const filtered = bookings.filter(

            booking =>

                booking.bookingStatus

                    .toLowerCase()

                    .includes(

                        searchStatus.toLowerCase()

                    )

        );

        setBookings(filtered);

    };

    const handleView = (booking) => {

        setSelectedBooking(booking);

        setShowModal(true);

    };

    const handlePayment = (booking) => {

    navigate(

        "/user/pay",

        {

            state: {

                booking

            }

        }

    );

};
        return (

        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    My Bookings

                </h2>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <input
                        className="form-control"
                        placeholder="Search Booking Status"
                        value={searchStatus}
                        onChange={(e) =>
                            setSearchStatus(e.target.value)
                        }
                    />

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleSearch}
                    >

                        Search

                    </button>

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-dark w-100"
                        onClick={() => loadBookings(userId)}
                    >

                        Reset

                    </button>

                </div>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover table-bordered align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Flight No</th>

                                <th>Flight</th>

                                <th>Booking Date</th>

                                <th>Amount</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                bookings.length > 0 ?

                                (

                                    bookings.map((booking) => (

                                        <tr key={booking.bookingId}>

                                            <td>

                                                {booking.bookingId}

                                            </td>

                                            <td>

                                                {booking.flight.flightNumber}

                                            </td>

                                            <td>

                                                {booking.flight.flightName}

                                            </td>

                                            <td>

                                                {booking.bookingDate}

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

                                           <td>

    <button
        className="btn btn-info btn-sm me-2"
        onClick={() => handleView(booking)}
    >

        View

    </button>

    {

        paidBookings[booking.bookingId]

        ?

        (

            <span className="badge bg-success">

                ✓ Paid

            </span>

        )

        :

        (

            <button
                className="btn btn-success btn-sm"
                onClick={() => handlePayment(booking)}
            >

                Pay Now

            </button>

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
                                            colSpan="7"
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
                        {

                showModal && selectedBooking && (

                    <div
                        className="modal d-block"
                        style={{
                            background: "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-lg">

                            <div className="modal-content">

                                <div className="modal-header bg-primary text-white">

                                    <h5 className="modal-title">

                                        Booking Details

                                    </h5>

                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    >

                                    </button>

                                </div>

                                <div className="modal-body">

                                    <div className="row">

                                        <div className="col-md-6">

                                            <p>

                                                <strong>

                                                    Booking ID :

                                                </strong>

                                                {" "}

                                                {selectedBooking.bookingId}

                                            </p>

                                            <p>

                                                <strong>

                                                    Flight Name :

                                                </strong>

                                                {" "}

                                                {selectedBooking.flight.flightName}

                                            </p>

                                            <p>

                                                <strong>

                                                    Flight Number :

                                                </strong>

                                                {" "}

                                                {selectedBooking.flight.flightNumber}

                                            </p>

                                            <p>

                                                <strong>

                                                    Origin :

                                                </strong>

                                                {" "}

                                                {selectedBooking.flight.origin}

                                            </p>

                                            <p>

                                                <strong>

                                                    Destination :

                                                </strong>

                                                {" "}

                                                {selectedBooking.flight.destination}

                                            </p>

                                        </div>

                                        <div className="col-md-6">

                                            <p>

                                                <strong>

                                                    Booking Date :

                                                </strong>

                                                {" "}

                                                {selectedBooking.bookingDate}

                                            </p>

                                            <p>

                                                <strong>

                                                    Total Amount :

                                                </strong>

                                                {" "}

                                                ₹ {selectedBooking.totalAmount}

                                            </p>

                                            <p>

                                                <strong>

                                                    Booking Status :

                                                </strong>

                                                {" "}

                                                <span
                                                    className={`badge ${
                                                        selectedBooking.bookingStatus === "CONFIRMED"
                                                            ? "bg-success"
                                                            : selectedBooking.bookingStatus === "PENDING"
                                                            ? "bg-warning text-dark"
                                                            : "bg-danger"
                                                    }`}
                                                >

                                                    {selectedBooking.bookingStatus}

                                                </span>

                                            </p>

                                            <p>

                                                <strong>

                                                    Departure :

                                                </strong>

                                                {" "}

                                                {selectedBooking.flight.departureTime}

                                            </p>

                                            <p>

                                                <strong>

                                                    Arrival :

                                                </strong>

                                                {" "}

                                                {selectedBooking.flight.arrivalTime}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    >

                                        Close

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )

            }
                    </div>

    );

}

export default UserBookings;