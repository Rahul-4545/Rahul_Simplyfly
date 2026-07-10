import { useEffect, useState } from "react";

import { getRefundsByUser } from "../../services/refundService";

function UserRefunds() {

    const [refunds, setRefunds] = useState([]);

    const [userId, setUserId] = useState(0);

    useEffect(() => {

        const id = Number(

            localStorage.getItem("userId")

        );

        if (id) {

            setUserId(id);

            loadRefunds(id);

        }

    }, []);

    const loadRefunds = async (id) => {

        try {

            const response = await getRefundsByUser(id);

            setRefunds(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

        return (

        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    My Refunds

                </h2>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>Refund ID</th>

                                <th>Booking ID</th>

                                <th>Flight</th>

                                <th>Amount</th>

                                <th>Status</th>

                                <th>Refund Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                refunds.length > 0

                                ?

                                (

                                    refunds.map((refund) => (

                                        <tr key={refund.refundId}>

                                            <td>

                                                {refund.refundId}

                                            </td>

                                            <td>

                                                {refund.booking.bookingId}

                                            </td>

                                            <td>

                                                {refund.booking.flight.flightName}

                                            </td>

                                            <td>

                                                ₹ {refund.refundAmount}

                                            </td>

                                            <td>

                                                <span

                                                    className={

                                                        refund.refundStatus === "APPROVED"

                                                        ?

                                                        "badge bg-success"

                                                        :

                                                        refund.refundStatus === "REJECTED"

                                                        ?

                                                        "badge bg-danger"

                                                        :

                                                        "badge bg-warning text-dark"

                                                    }

                                                >

                                                    {refund.refundStatus}

                                                </span>

                                            </td>

                                            <td>

                                                {refund.refundDate}

                                            </td>

                                        </tr>

                                    ))

                                )

                                :

                                (

                                    <tr>

                                        <td

                                            colSpan="6"

                                            className="text-center"

                                        >

                                            No Refunds Found

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

export default UserRefunds;

