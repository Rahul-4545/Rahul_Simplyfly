import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { addRefund } from "../../services/refundService";

function RequestRefund() {

    const location = useLocation();

    const navigate = useNavigate();

    const payment = location.state?.payment;

    const [loading, setLoading] = useState(false);

    const [refund, setRefund] = useState({

        bookingId: payment?.booking.bookingId || "",

        refundAmount: payment?.amount || 0,

        refundStatus: "REQUESTED",

        refundDate: new Date()

            .toISOString()

            .slice(0,10)

    });

    const handleChange = (e) => {

        setRefund({

            ...refund,

            [e.target.name]: e.target.value

        });

    };

    const handleRefund = async () => {

        try {

            setLoading(true);

            await addRefund(refund);

            alert("Refund Requested Successfully");

            navigate("/user/refunds");

        }

        catch (error) {

            console.log(error);

            alert("Refund Request Failed");

        }

        finally {

            setLoading(false);

        }

    };

    if (!payment) {

        return (

            <div className="container mt-5">

                <div className="alert alert-warning">

                    <h4>

                        No Payment Selected

                    </h4>

                    <button

                        className="btn btn-primary"

                        onClick={() => navigate("/user/payments")}

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

                <div className="card-header bg-danger text-white">

                    <h3 className="mb-0">

                        Request Refund

                    </h3>

                </div>

                <div className="card-body">
                                        <div className="row">

                        <div className="col-md-6">

                            <h5 className="mb-3">

                                Payment Details

                            </h5>

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>

                                        <th width="40%">

                                            Payment ID

                                        </th>

                                        <td>

                                            {payment.paymentId}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Booking ID

                                        </th>

                                        <td>

                                            {payment.booking.bookingId}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Flight

                                        </th>

                                        <td>

                                            {payment.booking.flight.flightName}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Flight Number

                                        </th>

                                        <td>

                                            {payment.booking.flight.flightNumber}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Amount Paid

                                        </th>

                                        <td className="fw-bold text-success">

                                            ₹ {payment.amount}

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        <div className="col-md-6">

                            <h5 className="mb-3">

                                Refund Details

                            </h5>

                            <div className="mb-3">

                                <label className="form-label">

                                    Refund Amount

                                </label>

                                <input
                                    className="form-control"
                                    value={`₹ ${refund.refundAmount}`}
                                    disabled
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Refund Status

                                </label>

                                <input
                                    className="form-control"
                                    value={refund.refundStatus}
                                    disabled
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Refund Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="refundDate"
                                    value={refund.refundDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="alert alert-warning">

                                <strong>

                                    Note:

                                </strong>

                                Refund requests are subject to airline approval.

                            </div>

                        </div>

                    </div>

                    <hr />

                    <div className="d-flex justify-content-end gap-2">

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/user/payments")}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleRefund}
                            disabled={loading}
                        >

                            {

                                loading

                                    ?

                                    "Submitting..."

                                    :

                                    "Request Refund"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>
            );

}

export default RequestRefund;