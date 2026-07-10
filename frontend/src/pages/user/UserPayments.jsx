import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {

    getPaymentsByUser

} from "../../services/paymentService";

function UserPayments() {

    const [payments, setPayments] = useState([]);

    const [userId, setUserId] = useState(0);

    const [searchStatus, setSearchStatus] = useState("");

    const [selectedPayment, setSelectedPayment] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const id = Number(

            localStorage.getItem("userId")

        );

        if (id) {

            setUserId(id);

            loadPayments(id);

        }

    }, []);

    const loadPayments = async (id) => {

        try {

            const response = await getPaymentsByUser(id);

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSearch = () => {

        if (searchStatus === "") {

            loadPayments(userId);

            return;

        }

        const filtered = payments.filter(

            payment =>

                payment.paymentStatus

                    .toLowerCase()

                    .includes(

                        searchStatus.toLowerCase()

                    )

        );

        setPayments(filtered);

    };

    const handleView = (payment) => {

        setSelectedPayment(payment);

        setShowModal(true);

    };

        return (

        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    My Payments

                </h2>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <input
                        className="form-control"
                        placeholder="Search Payment Status"
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
                        onClick={() => loadPayments(userId)}
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

                                <th>Payment ID</th>

                                <th>Booking ID</th>

                                <th>Amount</th>

                                <th>Method</th>

                                <th>Status</th>

                                <th>Payment Date</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                payments.length > 0 ?

                                (

                                    payments.map((payment) => (

                                        <tr key={payment.paymentId}>

                                            <td>

                                                {payment.paymentId}

                                            </td>

                                            <td>

                                                {payment.booking.bookingId}

                                            </td>

                                            <td>

                                                ₹ {payment.amount}

                                            </td>

                                            <td>

                                                {payment.paymentMethod}

                                            </td>

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

                                            <td>

                                                {payment.paymentDate}

                                            </td>

                                            <td>

    <button
        className="btn btn-info btn-sm me-2"
        onClick={() => handleView(payment)}
    >

        View

    </button>

    {

        payment.paymentStatus === "SUCCESS"

        &&

        (

            <button
                className="btn btn-danger btn-sm"
                onClick={() =>

                    navigate(

                        "/user/refund-request",

                        {

                            state: {

                                payment

                            }

                        }

                    )

                }
            >

                Request Refund

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

                                            No Payments Found

                                        </td>

                                    </tr>

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

                        {

                showModal && selectedPayment && (

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

                                        Payment Details

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

                                                    Payment ID :

                                                </strong>

                                                {" "}

                                                {selectedPayment.paymentId}

                                            </p>

                                            <p>

                                                <strong>

                                                    Booking ID :

                                                </strong>

                                                {" "}

                                                {selectedPayment.booking.bookingId}

                                            </p>

                                            <p>

                                                <strong>

                                                    Flight :

                                                </strong>

                                                {" "}

                                                {selectedPayment.booking.flight.flightName}

                                            </p>

                                            <p>

                                                <strong>

                                                    Flight Number :

                                                </strong>

                                                {" "}

                                                {selectedPayment.booking.flight.flightNumber}

                                            </p>

                                            <p>

                                                <strong>

                                                    User :

                                                </strong>

                                                {" "}

                                                {selectedPayment.booking.user.name}

                                            </p>

                                        </div>

                                        <div className="col-md-6">

                                            <p>

                                                <strong>

                                                    Amount :

                                                </strong>

                                                {" "}

                                                ₹ {selectedPayment.amount}

                                            </p>

                                            <p>

                                                <strong>

                                                    Payment Method :

                                                </strong>

                                                {" "}

                                                {selectedPayment.paymentMethod}

                                            </p>

                                            <p>

                                                <strong>

                                                    Payment Status :

                                                </strong>

                                                {" "}

                                                <span
                                                    className={`badge ${
                                                        selectedPayment.paymentStatus === "SUCCESS"
                                                            ? "bg-success"
                                                            : selectedPayment.paymentStatus === "PENDING"
                                                            ? "bg-warning text-dark"
                                                            : "bg-danger"
                                                    }`}
                                                >

                                                    {selectedPayment.paymentStatus}

                                                </span>

                                            </p>

                                            <p>

                                                <strong>

                                                    Payment Date :

                                                </strong>

                                                {" "}

                                                {selectedPayment.paymentDate}

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

export default UserPayments;