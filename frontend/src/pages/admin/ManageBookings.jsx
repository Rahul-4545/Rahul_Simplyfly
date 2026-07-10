import { useEffect, useState } from "react";

import {
    getBookings,
    getBookingById,
    addBooking,
    updateBooking,
    deleteBooking,
    searchBookingStatus,
    searchUserBookings,
    searchFlightBookings,
    amountGreaterThan,
    sortAmountDesc
} from "../../services/bookingService";

function ManageBookings() {

    const [bookings, setBookings] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [status, setStatus] = useState("");

    const [userIdSearch, setUserIdSearch] = useState("");

    const [flightIdSearch, setFlightIdSearch] = useState("");

    const [amountSearch, setAmountSearch] = useState("");

    const [newBooking, setNewBooking] = useState({

        userId: "",

        flightId: "",

        bookingDate: "",

        totalAmount: "",

        bookingStatus: ""

    });

    const [selectedBooking, setSelectedBooking] = useState({

        bookingId: "",

        userId: "",

        flightId: "",

        bookingDate: "",

        totalAmount: "",

        bookingStatus: ""

    });

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const response = await getBookings();

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAddChange = (e) => {

        setNewBooking({

            ...newBooking,

            [e.target.name]: e.target.value

        });

    };

    const handleAddBooking = async () => {

        try {

            await addBooking(newBooking);

            alert("Booking Added Successfully");

            setShowAddModal(false);

            loadBookings();

            setNewBooking({

                userId: "",

                flightId: "",

                bookingDate: "",

                totalAmount: "",

                bookingStatus: ""

            });

        }

        catch (error) {

            console.log(error);

            alert("Unable to Add Booking");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this booking?"
        );

        if (!confirmDelete) return;

        try {

            await deleteBooking(id);

            alert("Booking Deleted Successfully");

            loadBookings();

        }

        catch (error) {

            console.log(error);

            alert("Unable to Delete Booking");

        }

    };

    const handleEdit = async (id) => {

        try {

            const response = await getBookingById(id);

            setSelectedBooking(response.data);

            setShowEditModal(true);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleEditChange = (e) => {

        setSelectedBooking({

            ...selectedBooking,

            [e.target.name]: e.target.value

        });

    };

    const handleUpdate = async () => {

        try {

            await updateBooking(selectedBooking);

            alert("Booking Updated Successfully");

            setShowEditModal(false);

            loadBookings();

        }

        catch (error) {

            console.log(error);

            alert("Unable to Update Booking");

        }

    };

        const handleStatus = async () => {

        if (status.trim() === "") {

            loadBookings();

            return;

        }

        try {

            const response = await searchBookingStatus(status);

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleUserSearch = async () => {

        if (userIdSearch === "") {

            loadBookings();

            return;

        }

        try {

            const response = await searchUserBookings(userIdSearch);

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleFlightSearch = async () => {

        if (flightIdSearch === "") {

            loadBookings();

            return;

        }

        try {

            const response = await searchFlightBookings(flightIdSearch);

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAmount = async () => {

        if (amountSearch === "") {

            loadBookings();

            return;

        }

        try {

            const response = await amountGreaterThan(amountSearch);

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAmountDesc = async () => {

        try {

            const response = await sortAmountDesc();

            setBookings(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleReset = () => {

        setStatus("");

        setUserIdSearch("");

        setFlightIdSearch("");

        setAmountSearch("");

        loadBookings();

    };

    return (

        <>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">

                        Manage Bookings

                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >

                        + Add Booking

                    </button>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Booking Status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={handleStatus}
                                >

                                    Status

                                </button>

                            </div>

                            <div className="col-md-2">

                                <input
                                    className="form-control"
                                    placeholder="User ID"
                                    value={userIdSearch}
                                    onChange={(e) => setUserIdSearch(e.target.value)}
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleUserSearch}
                                >

                                    User

                                </button>

                            </div>

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Flight ID"
                                    value={flightIdSearch}
                                    onChange={(e) => setFlightIdSearch(e.target.value)}
                                />

                            </div>

                        </div>

                        <div className="row mb-4">

                            <div className="col-md-3">

                                <button
                                    className="btn btn-warning w-100"
                                    onClick={handleFlightSearch}
                                >

                                    Flight

                                </button>

                            </div>

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Amount >"
                                    value={amountSearch}
                                    onChange={(e) => setAmountSearch(e.target.value)}
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-info w-100"
                                    onClick={handleAmount}
                                >

                                    Amount

                                </button>

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={handleAmountDesc}
                                >

                                    Amount ↓

                                </button>

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-dark w-100"
                                    onClick={handleReset}
                                >

                                    Reset

                                </button>

                            </div>

                        </div>

                        <table className="table table-hover table-bordered align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>

                                    <th>User ID</th>

                                    <th>Flight ID</th>

                                    <th>Booking Date</th>

                                    <th>Amount</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    bookings.map((booking) => (

                                        <tr key={booking.bookingId}>

                                            <td>{booking.bookingId}</td>

                                            <td>{booking.user.userId}</td>

                                            <td>{booking.flight.flightId}</td>

                                            <td>{booking.bookingDate}</td>

                                            <td>₹ {booking.totalAmount}</td>

                                            <td>

                                                <span className={`badge ${
                                                    booking.bookingStatus === "CONFIRMED"
                                                        ? "bg-success"
                                                        : booking.bookingStatus === "PENDING"
                                                        ? "bg-warning text-dark"
                                                        : "bg-danger"
                                                }`}>

                                                    {booking.bookingStatus}

                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(booking.bookingId)}
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(booking.bookingId)}
                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
                    {/* =========================
            ADD BOOKING MODAL
        ========================== */}

        {showAddModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Add Booking</h5>

                            <button
                                className="btn-close"
                                onClick={() => setShowAddModal(false)}
                            />

                        </div>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label>User ID</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="userId"
                                    value={newBooking.userId}
                                    onChange={handleAddChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Flight ID</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="flightId"
                                    value={newBooking.flightId}
                                    onChange={handleAddChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Booking Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="bookingDate"
                                    value={newBooking.bookingDate}
                                    onChange={handleAddChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Total Amount</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="totalAmount"
                                    value={newBooking.totalAmount}
                                    onChange={handleAddChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Status</label>

                                <select
                                    className="form-select"
                                    name="bookingStatus"
                                    value={newBooking.bookingStatus}
                                    onChange={handleAddChange}
                                >

                                    <option value="">

                                        Select Status

                                    </option>

                                    <option value="PENDING">

                                        PENDING

                                    </option>

                                    <option value="CONFIRMED">

                                        CONFIRMED

                                    </option>

                                    <option value="CANCELLED">

                                        CANCELLED

                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowAddModal(false)}
                            >

                                Cancel

                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={handleAddBooking}
                            >

                                Add Booking

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}
                {/* =========================
            EDIT BOOKING MODAL
        ========================== */}

        {showEditModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Edit Booking</h5>

                            <button
                                className="btn-close"
                                onClick={() => setShowEditModal(false)}
                            />

                        </div>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label>User ID</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="userId"
                                    value={selectedBooking.userId}
                                    onChange={handleEditChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Flight ID</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="flightId"
                                    value={selectedBooking.flightId}
                                    onChange={handleEditChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Booking Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="bookingDate"
                                    value={selectedBooking.bookingDate}
                                    onChange={handleEditChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Total Amount</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="totalAmount"
                                    value={selectedBooking.totalAmount}
                                    onChange={handleEditChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Status</label>

                                <select
                                    className="form-select"
                                    name="bookingStatus"
                                    value={selectedBooking.bookingStatus}
                                    onChange={handleEditChange}
                                >

                                    <option value="PENDING">

                                        PENDING

                                    </option>

                                    <option value="CONFIRMED">

                                        CONFIRMED

                                    </option>

                                    <option value="CANCELLED">

                                        CANCELLED

                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowEditModal(false)}
                            >

                                Cancel

                            </button>

                            <button
                                className="btn btn-success"
                                onClick={handleUpdate}
                            >

                                Update Booking

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}

    </>

    );

}

export default ManageBookings;