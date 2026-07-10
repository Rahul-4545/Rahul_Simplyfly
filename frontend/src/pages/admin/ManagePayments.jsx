import { useEffect, useState } from "react";

import {
    getPayments,
    getPaymentById,
    addPayment,
    updatePayment,
    deletePayment,
    searchPaymentStatus,
    searchPaymentMethod,
    searchBookingPayment,
    amountGreaterThan,
    sortAmountDesc
} from "../../services/paymentService";

function ManagePayments() {

    const [payments, setPayments] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [status, setStatus] = useState("");

    const [method, setMethod] = useState("");

    const [bookingIdSearch, setBookingIdSearch] = useState("");

    const [amountSearch, setAmountSearch] = useState("");

    const [newPayment, setNewPayment] = useState({

        bookingId: "",

        amount: "",

        paymentMethod: "",

        paymentStatus: "",

        paymentDate: ""

    });

    const [selectedPayment, setSelectedPayment] = useState({

        paymentId: "",

        bookingId: "",

        amount: "",

        paymentMethod: "",

        paymentStatus: "",

        paymentDate: ""

    });

    useEffect(() => {

        loadPayments();

    }, []);

    const loadPayments = async () => {

        try {

            const response = await getPayments();

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAddChange = (e) => {

        setNewPayment({

            ...newPayment,

            [e.target.name]: e.target.value

        });

    };

    const handleAddPayment = async () => {

        try {

            await addPayment(newPayment);

            alert("Payment Added Successfully");

            setShowAddModal(false);

            loadPayments();

            setNewPayment({

                bookingId: "",

                amount: "",

                paymentMethod: "",

                paymentStatus: "",

                paymentDate: ""

            });

        }

        catch (error) {

            console.log(error);

            alert("Unable to Add Payment");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this payment?"
        );

        if (!confirmDelete) return;

        try {

            await deletePayment(id);

            alert("Payment Deleted Successfully");

            loadPayments();

        }

        catch (error) {

            console.log(error);

            alert("Unable to Delete Payment");

        }

    };

    const handleEdit = async (id) => {

        try {

            const response = await getPaymentById(id);

            setSelectedPayment(response.data);

            setShowEditModal(true);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleEditChange = (e) => {

        setSelectedPayment({

            ...selectedPayment,

            [e.target.name]: e.target.value

        });

    };

    const handleUpdate = async () => {

        try {

            await updatePayment(selectedPayment);

            alert("Payment Updated Successfully");

            setShowEditModal(false);

            loadPayments();

        }

        catch (error) {

            console.log(error);

            alert("Unable to Update Payment");

        }

    };
        const handleStatus = async () => {

        if (status.trim() === "") {

            loadPayments();

            return;

        }

        try {

            const response = await searchPaymentStatus(status);

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleMethod = async () => {

        if (method.trim() === "") {

            loadPayments();

            return;

        }

        try {

            const response = await searchPaymentMethod(method);

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleBooking = async () => {

        if (bookingIdSearch === "") {

            loadPayments();

            return;

        }

        try {

            const response = await searchBookingPayment(bookingIdSearch);

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAmount = async () => {

        if (amountSearch === "") {

            loadPayments();

            return;

        }

        try {

            const response = await amountGreaterThan(amountSearch);

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAmountDesc = async () => {

        try {

            const response = await sortAmountDesc();

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleReset = () => {

        setStatus("");

        setMethod("");

        setBookingIdSearch("");

        setAmountSearch("");

        loadPayments();

    };

    return (

        <>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">

                        Manage Payments

                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >

                        + Add Payment

                    </button>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <div className="row mb-3">

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Payment Status"
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

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Payment Method"
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleMethod}
                                >

                                    Method

                                </button>

                            </div>

                            <div className="col-md-2">

                                <input
                                    className="form-control"
                                    placeholder="Booking ID"
                                    value={bookingIdSearch}
                                    onChange={(e) => setBookingIdSearch(e.target.value)}
                                />

                            </div>

                        </div>

                        <div className="row mb-4">

                            <div className="col-md-3">

                                <button
                                    className="btn btn-warning w-100"
                                    onClick={handleBooking}
                                >

                                    Booking

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

                                    <th>Booking ID</th>

                                    <th>Amount</th>

                                    <th>Method</th>

                                    <th>Status</th>

                                    <th>Date</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    payments.map((payment) => (

                                        <tr key={payment.paymentId}>

                                            <td>{payment.paymentId}</td>

                                            <td>{payment.booking.bookingId}</td>

                                            <td>₹ {payment.amount}</td>

                                            <td>{payment.paymentMethod}</td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        payment.paymentStatus === "SUCCESS"
                                                            ? "bg-success"
                                                            : payment.paymentStatus === "PENDING"
                                                            ? "bg-warning text-dark"
                                                            : "bg-danger"
                                                    }`}
                                                >

                                                    {payment.paymentStatus}

                                                </span>

                                            </td>

                                            <td>{payment.paymentDate}</td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(payment.paymentId)}
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(payment.paymentId)}
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
            ADD PAYMENT MODAL
        ========================== */}

        {showAddModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Add Payment</h5>

                            <button
                                className="btn-close"
                                onClick={() => setShowAddModal(false)}
                            />

                        </div>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label>Booking ID</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="bookingId"
                                    value={newPayment.bookingId}
                                    onChange={handleAddChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Amount</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={newPayment.amount}
                                    onChange={handleAddChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Payment Method</label>

                                <select
                                    className="form-select"
                                    name="paymentMethod"
                                    value={newPayment.paymentMethod}
                                    onChange={handleAddChange}
                                >

                                    <option value="">

                                        Select Method

                                    </option>

                                    <option value="UPI">

                                        UPI

                                    </option>

                                    <option value="CARD">

                                        CARD

                                    </option>

                                    <option value="NET_BANKING">

                                        NET_BANKING

                                    </option>

                                    <option value="CASH">

                                        CASH

                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Payment Status</label>

                                <select
                                    className="form-select"
                                    name="paymentStatus"
                                    value={newPayment.paymentStatus}
                                    onChange={handleAddChange}
                                >

                                    <option value="">

                                        Select Status

                                    </option>

                                    <option value="SUCCESS">

                                        SUCCESS

                                    </option>

                                    <option value="PENDING">

                                        PENDING

                                    </option>

                                    <option value="FAILED">

                                        FAILED

                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Payment Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="paymentDate"
                                    value={newPayment.paymentDate}
                                    onChange={handleAddChange}
                                />

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
                                onClick={handleAddPayment}
                            >

                                Add Payment

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}
                {/* =========================
            EDIT PAYMENT MODAL
        ========================== */}

        {showEditModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Edit Payment</h5>

                            <button
                                className="btn-close"
                                onClick={() => setShowEditModal(false)}
                            />

                        </div>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label>Booking ID</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="bookingId"
                                    value={selectedPayment.bookingId}
                                    onChange={handleEditChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Amount</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={selectedPayment.amount}
                                    onChange={handleEditChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Payment Method</label>

                                <select
                                    className="form-select"
                                    name="paymentMethod"
                                    value={selectedPayment.paymentMethod}
                                    onChange={handleEditChange}
                                >

                                    <option value="UPI">

                                        UPI

                                    </option>

                                    <option value="CARD">

                                        CARD

                                    </option>

                                    <option value="NET_BANKING">

                                        NET_BANKING

                                    </option>

                                    <option value="CASH">

                                        CASH

                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Payment Status</label>

                                <select
                                    className="form-select"
                                    name="paymentStatus"
                                    value={selectedPayment.paymentStatus}
                                    onChange={handleEditChange}
                                >

                                    <option value="SUCCESS">

                                        SUCCESS

                                    </option>

                                    <option value="PENDING">

                                        PENDING

                                    </option>

                                    <option value="FAILED">

                                        FAILED

                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Payment Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="paymentDate"
                                    value={selectedPayment.paymentDate}
                                    onChange={handleEditChange}
                                />

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

                                Update Payment

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}

        </>

    );

}

export default ManagePayments;