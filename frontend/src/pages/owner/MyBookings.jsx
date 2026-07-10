import { useEffect, useState } from "react";

import {

    getBookingsByOwner

} from "../../services/bookingService";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const [ownerId, setOwnerId] = useState(0);

    const [searchStatus, setSearchStatus] = useState("");
    const [showModal, setShowModal] = useState(false);

const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {

    const id = Number(

        localStorage.getItem("userId")

    );

    if (id) {

        setOwnerId(id);

        loadBookings(id);

    }

}, []);

    const loadBookings = async (id) => {

        try {

            const response = await getBookingsByOwner(id);

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSearch = () => {

        if (searchStatus === "") {

            loadBookings(ownerId);

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
                        onClick={() => loadBookings(ownerId)}
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

                    <th>User ID</th>

                    <th>Flight No</th>

                    <th>Booking Date</th>

                    <th>Amount</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    bookings.length > 0 ? (

                        bookings.map((booking) => (

                            <tr key={booking.bookingId}>

                                <td>{booking.bookingId}</td>

                                <td>{booking.user.userId}</td>

                                <td>{booking.flight.flightNumber}</td>

                                <td>{booking.bookingDate}</td>

                                <td>₹ {booking.totalAmount}</td>

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
                                        className="btn btn-info btn-sm"
                                        onClick={() => handleView(booking)}
                                    >

                                        View

                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

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
{showModal && selectedBooking && (

    <div
        className="modal d-block"
        style={{ background: "rgba(0,0,0,.5)" }}
    >

        <div className="modal-dialog">

            <div className="modal-content">

                <div className="modal-header">

                    <h5>

                        Booking Details

                    </h5>

                    <button
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                    />

                </div>

                <div className="modal-body">

                    <p>

                        <strong>Booking ID :</strong>

                        {selectedBooking.bookingId}

                    </p>

                    <p>

                        <strong>User :</strong>

                        {selectedBooking.user.name}

                    </p>

                    <p>

                        <strong>Flight :</strong>

                        {selectedBooking.flight.flightName}

                    </p>

                    <p>

                        <strong>Flight No :</strong>

                        {selectedBooking.flight.flightNumber}

                    </p>

                    <p>

                        <strong>Origin :</strong>

                        {selectedBooking.flight.origin}

                    </p>

                    <p>

                        <strong>Destination :</strong>

                        {selectedBooking.flight.destination}

                    </p>

                    <p>

                        <strong>Booking Date :</strong>

                        {selectedBooking.bookingDate}

                    </p>

                    <p>

                        <strong>Total Amount :</strong>

                        ₹ {selectedBooking.totalAmount}

                    </p>

                    <p>

                        <strong>Status :</strong>

                        {selectedBooking.bookingStatus}

                    </p>

                </div>

                <div className="modal-footer">

                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    </div>

)}
        </div>

    );

}

export default MyBookings;