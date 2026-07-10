import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { addPayment } from "../../services/paymentService";

function PaymentPage() {

    const location = useLocation();

    const navigate = useNavigate();

    const booking = location.state?.booking;

    const [loading, setLoading] = useState(false);

    const [payment, setPayment] = useState({

        bookingId: booking?.bookingId || "",

        amount: booking?.totalAmount || 0,

        paymentMethod: "UPI",

        paymentStatus: "SUCCESS",

        paymentDate: new Date()

            .toISOString()

            .slice(0,10)

    });

    const handleChange = (e) => {

        setPayment({

            ...payment,

            [e.target.name]: e.target.value

        });

    };

    const handlePayment = async () => {

        try {

            setLoading(true);

            await addPayment(payment);

            alert("Payment Successful 💳");

            navigate("/user/payments");

        }

        catch (error) {

            console.log(error);

            alert("Payment Failed");

        }

        finally {

            setLoading(false);

        }

    };

    if (!booking) {

        return (

            <div className="container mt-5">

                <div className="alert alert-warning">

                    <h4>

                        No Booking Selected

                    </h4>

                    <button

                        className="btn btn-primary"

                        onClick={() => navigate("/user/bookings")}

                    >

                        Back

                    </button>

                </div>

            </div>

        );

    }
        return (

        <div className="container mt-4">

            <div className="card shadow border-0">

                <div className="card-header bg-success text-white">

                    <h3 className="mb-0">

                        💳 Payment

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">

                            <h5 className="mb-3">

                                Booking Details

                            </h5>

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>

                                        <th width="40%">

                                            Booking ID

                                        </th>

                                        <td>

                                            {booking.bookingId}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Flight

                                        </th>

                                        <td>

                                            {booking.flight.flightName}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Flight Number

                                        </th>

                                        <td>

                                            {booking.flight.flightNumber}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Origin

                                        </th>

                                        <td>

                                            {booking.flight.origin}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Destination

                                        </th>

                                        <td>

                                            {booking.flight.destination}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Total Amount

                                        </th>

                                        <td className="fw-bold text-success">

                                            ₹ {booking.totalAmount}

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        <div className="col-md-6">

                            <h5 className="mb-3">

                                Payment Information

                            </h5>

                            <div className="mb-3">

                                <label className="form-label">

                                    Payment Method

                                </label>

                                <select

                                    className="form-select"

                                    name="paymentMethod"

                                    value={payment.paymentMethod}

                                    onChange={handleChange}

                                >

                                    <option value="UPI">

                                        UPI

                                    </option>

                                    <option value="CARD">

                                        Card

                                    </option>

                                    <option value="NET_BANKING">

                                        Net Banking

                                    </option>

                                    <option value="CASH">

                                        Cash

                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Payment Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="paymentDate"

                                    value={payment.paymentDate}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Amount

                                </label>

                                <input

                                    className="form-control fw-bold"

                                    value={`₹ ${payment.amount}`}

                                    disabled

                                />

                            </div>

                                                        <div className="alert alert-info mt-4">

                                <strong>

                                    Booking Status :

                                </strong>

                                {" "}

                                {booking.bookingStatus}

                            </div>

                            <div className="alert alert-success">

                                <strong>

                                    Total Payable :

                                </strong>

                                {" "}

                                ₹ {payment.amount}

                            </div>

                        </div>

                    </div>

                    <hr />

                    <div className="d-flex justify-content-end gap-2">

                        <button

                            className="btn btn-secondary"

                            onClick={() => navigate("/user/bookings")}

                        >

                            Cancel

                        </button>

                        <button

                            className="btn btn-success"

                            onClick={handlePayment}

                            disabled={loading}

                        >

                            {

                                loading

                                    ?

                                    "Processing Payment..."

                                    :

                                    `Pay ₹${payment.amount}`

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>
            );

}

export default PaymentPage;