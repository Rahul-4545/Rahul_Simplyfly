import { useEffect, useState } from "react";

import {

    getRefundsByOwner,

    updateRefund

} from "../../services/refundService";

function OwnerRefunds() {

    const [refunds, setRefunds] = useState([]);

    const [ownerId, setOwnerId] = useState(0);

    const [search, setSearch] = useState("");

    useEffect(() => {

        const id = Number(

            localStorage.getItem("userId")

        );

        if (id) {

            setOwnerId(id);

            loadRefunds(id);

        }

    }, []);

    const loadRefunds = async (id) => {

        try {

            const response = await getRefundsByOwner(id);

            setRefunds(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };
        const updateStatus = async (

        refund,

        status

    ) => {

        try {

            const updatedRefund = {

                refundId: refund.refundId,

                bookingId: refund.booking.bookingId,

                refundAmount: refund.refundAmount,

                refundStatus: status,

                refundDate: refund.refundDate

            };

            await updateRefund(updatedRefund);

            alert(

                `Refund ${status}`

            );

            loadRefunds(ownerId);

        }

        catch (error) {

            console.log(error);

            alert("Unable to update refund");

        }

    };
        const filteredRefunds = refunds.filter(

        refund =>

            refund.refundStatus

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

    );
    return (

<div className="container-fluid mt-4">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

            Refund Requests

        </h2>

    </div>

    <div className="row mb-4">

        <div className="col-md-4">

            <input

                className="form-control"

                placeholder="Search Status"

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

        </div>

        <div className="col-md-2">

            <button

                className="btn btn-dark w-100"

                onClick={()=>loadRefunds(ownerId)}

            >

                Refresh

            </button>

        </div>

    </div>

    <div className="card shadow">

        <div className="card-body">

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Passenger</th>

                        <th>Flight</th>

                        <th>Amount</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                {

                    filteredRefunds.length>0 ?

                    (

                        filteredRefunds.map(refund=>(

                            <tr key={refund.refundId}>

                                <td>

                                    {refund.refundId}

                                </td>

                                <td>

                                    {refund.booking.user.name}

                                </td>

                                <td>

                                    {refund.booking.flight.flightNumber}

                                </td>

                                <td>

                                    ₹ {refund.refundAmount}

                                </td>

                                <td>

                                    <span

                                        className={

                                            refund.refundStatus==="APPROVED"

                                            ?

                                            "badge bg-success"

                                            :

                                            refund.refundStatus==="REJECTED"

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

                                    {

                                        refund.refundStatus==="REQUESTED"

                                        ?

                                        <>

                                        <button

                                            className="btn btn-success btn-sm me-2"

                                            onClick={()=>updateStatus(refund,"APPROVED")}

                                        >

                                            Approve

                                        </button>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={()=>updateStatus(refund,"REJECTED")}

                                        >

                                            Reject

                                        </button>

                                        </>

                                        :

                                        "-"

                                    }

                                </td>

                            </tr>

                        ))

                    )

                    :

                    <tr>

                        <td

                            colSpan="6"

                            className="text-center"

                        >

                            No Refund Requests

                        </td>

                    </tr>

                }

                </tbody>

            </table>

        </div>

    </div>

</div>

);

}

export default OwnerRefunds;