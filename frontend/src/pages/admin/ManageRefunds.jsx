import { useEffect, useState } from "react";

import {
    getRefunds,
    getRefundById,
    addRefund,
    updateRefund,
    deleteRefund,
    searchRefundStatus,
    searchRefundBooking,
    amountGreaterThan,
    sortAmountDesc
} from "../../services/refundService";

function ManageRefunds() {

    const [refunds, setRefunds] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [status, setStatus] = useState("");

    const [bookingIdSearch, setBookingIdSearch] = useState("");

    const [amountSearch, setAmountSearch] = useState("");

    const [newRefund, setNewRefund] = useState({

        bookingId: "",

        refundAmount: "",

        refundStatus: "",

        refundDate: ""

    });

    const [selectedRefund, setSelectedRefund] = useState({

        refundId: "",

        bookingId: "",

        refundAmount: "",

        refundStatus: "",

        refundDate: ""

    });

    useEffect(() => {

        loadRefunds();

    }, []);

    const loadRefunds = async () => {

        try {

            const response = await getRefunds();

            setRefunds(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAddChange = (e) => {

        setNewRefund({

            ...newRefund,

            [e.target.name]: e.target.value

        });

    };

    const handleAddRefund = async () => {

        try {

            await addRefund(newRefund);

            alert("Refund Added Successfully");

            setShowAddModal(false);

            loadRefunds();

            setNewRefund({

                bookingId: "",

                refundAmount: "",

                refundStatus: "",

                refundDate: ""

            });

        }

        catch (error) {

            console.log(error);

            alert("Unable to Add Refund");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this refund?"
        );

        if (!confirmDelete) return;

        try {

            await deleteRefund(id);

            alert("Refund Deleted Successfully");

            loadRefunds();

        }

        catch (error) {

            console.log(error);

            alert("Unable to Delete Refund");

        }

    };

    const handleEdit = async (id) => {

        try {

            const response = await getRefundById(id);

            setSelectedRefund(response.data);

            setShowEditModal(true);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleEditChange = (e) => {

        setSelectedRefund({

            ...selectedRefund,

            [e.target.name]: e.target.value

        });

    };

    const handleUpdate = async () => {

        try {

            await updateRefund(selectedRefund);

            alert("Refund Updated Successfully");

            setShowEditModal(false);

            loadRefunds();

        }

        catch (error) {

            console.log(error);

            alert("Unable to Update Refund");

        }

    };
        const handleStatus = async () => {

        if (status.trim() === "") {

            loadRefunds();

            return;

        }

        try {

            const response = await searchRefundStatus(status);

            setRefunds(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleBooking = async () => {

        if (bookingIdSearch === "") {

            loadRefunds();

            return;

        }

        try {

            const response = await searchRefundBooking(bookingIdSearch);

            setRefunds(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAmount = async () => {

        if (amountSearch === "") {

            loadRefunds();

            return;

        }

        try {

            const response = await amountGreaterThan(amountSearch);

            setRefunds(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAmountDesc = async () => {

        try {

            const response = await sortAmountDesc();

            setRefunds(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleReset = () => {

        setStatus("");

        setBookingIdSearch("");

        setAmountSearch("");

        loadRefunds();

    };

    return (

        <>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">

                        Manage Refunds

                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >

                        + Add Refund

                    </button>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Refund Status"
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
                                    placeholder="Booking ID"
                                    value={bookingIdSearch}
                                    onChange={(e) => setBookingIdSearch(e.target.value)}
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleBooking}
                                >

                                    Booking

                                </button>

                            </div>

                            <div className="col-md-2">

                                <input
                                    className="form-control"
                                    placeholder="Amount >"
                                    value={amountSearch}
                                    onChange={(e) => setAmountSearch(e.target.value)}
                                />

                            </div>

                        </div>

                        <div className="row mb-4">

                            <div className="col-md-3">

                                <button
                                    className="btn btn-info w-100"
                                    onClick={handleAmount}
                                >

                                    Amount

                                </button>

                            </div>

                            <div className="col-md-3">

                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={handleAmountDesc}
                                >

                                    Amount ↓

                                </button>

                            </div>

                            <div className="col-md-3">

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

                                    <th>Refund Amount</th>

                                    <th>Status</th>

                                    <th>Refund Date</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    refunds.map((refund) => (

                                        <tr key={refund.refundId}>

                                            <td>{refund.refundId}</td>

                                            <td>{refund.booking.bookingId}</td>

                                            <td>₹ {refund.refundAmount}</td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        refund.refundStatus === "APPROVED"
                                                            ? "bg-success"
                                                            : refund.refundStatus === "PENDING"
                                                            ? "bg-warning text-dark"
                                                            : "bg-danger"
                                                    }`}
                                                >

                                                    {refund.refundStatus}

                                                </span>

                                            </td>

                                            <td>{refund.refundDate}</td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(refund.refundId)}
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(refund.refundId)}
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
            ADD REFUND MODAL
        ========================== */}

        {showAddModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Add Refund</h5>

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
                                    value={newRefund.bookingId}
                                    onChange={handleAddChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Refund Amount</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="refundAmount"
                                    value={newRefund.refundAmount}
                                    onChange={handleAddChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Refund Status</label>

                                <select
                                    className="form-select"
                                    name="refundStatus"
                                    value={newRefund.refundStatus}
                                    onChange={handleAddChange}
                                >

                                    <option value="">

                                        Select Status

                                    </option>

                                    <option value="PENDING">

                                        PENDING

                                    </option>

                                    <option value="APPROVED">

                                        APPROVED

                                    </option>

                                    <option value="REJECTED">

                                        REJECTED

                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Refund Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="refundDate"
                                    value={newRefund.refundDate}
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
                                onClick={handleAddRefund}
                            >

                                Add Refund

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}
                {/* =========================
            EDIT REFUND MODAL
        ========================== */}

        {showEditModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Edit Refund</h5>

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
                                    value={selectedRefund.bookingId}
                                    onChange={handleEditChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Refund Amount</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="refundAmount"
                                    value={selectedRefund.refundAmount}
                                    onChange={handleEditChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Refund Status</label>

                                <select
                                    className="form-select"
                                    name="refundStatus"
                                    value={selectedRefund.refundStatus}
                                    onChange={handleEditChange}
                                >

                                    <option value="PENDING">

                                        PENDING

                                    </option>

                                    <option value="APPROVED">

                                        APPROVED

                                    </option>

                                    <option value="REJECTED">

                                        REJECTED

                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Refund Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="refundDate"
                                    value={selectedRefund.refundDate}
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

                                Update Refund

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}

        </>

    );

}

export default ManageRefunds;