import { useEffect, useState } from "react";

import {

    getFlightsByOwner,

    updateFlight

} from "../../services/flightService";

function OwnerManageSeats() {

    const [ownerId, setOwnerId] = useState(0);

    const [flights, setFlights] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedFlight, setSelectedFlight] = useState({

        flightId: "",

        flightName: "",

        flightNumber: "",

        origin: "",

        destination: "",

        departureTime: "",

        arrivalTime: "",

        fare: "",

        totalSeats: "",

        availableSeats: "",

        baggageCheckin: "",

        baggageCabin: "",

        ownerId: ""

    });

    useEffect(() => {

        const id = Number(

            localStorage.getItem("userId")

        );

        if (id) {

            setOwnerId(id);

            loadFlights(id);

        }

    }, []);

    const loadFlights = async (id) => {

        try {

            const response =

                await getFlightsByOwner(id);

            setFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleEdit = (flight) => {

        setSelectedFlight(flight);

        setShowModal(true);

    };

    const handleChange = (e) => {

        setSelectedFlight({

            ...selectedFlight,

            [e.target.name]: e.target.value

        });

    };
        const handleUpdate = async () => {

        try {

            await updateFlight(selectedFlight);

            alert("Seats Updated Successfully");

            setShowModal(false);

            loadFlights(ownerId);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    Manage Seats

                </h2>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover table-bordered align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Flight No</th>

                                <th>Flight Name</th>

                                <th>Total Seats</th>

                                <th>Available Seats</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                flights.length > 0 ? (

                                    flights.map((flight) => (

                                        <tr key={flight.flightId}>

                                            <td>

                                                {flight.flightId}

                                            </td>

                                            <td>

                                                {flight.flightNumber}

                                            </td>

                                            <td>

                                                {flight.flightName}

                                            </td>

                                            <td>

                                                {flight.totalSeats}

                                            </td>

                                            <td>

                                                {flight.availableSeats}

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleEdit(flight)}
                                                >

                                                    Manage

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >

                                            No Flights Found

                                        </td>

                                    </tr>

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>
                        {

                showModal && (

                    <div
                        className="modal d-block"
                        style={{
                            background: "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5>

                                        Manage Seats

                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    >

                                    </button>

                                </div>

                                <div className="modal-body">

                                    <div className="mb-3">

                                        <label>

                                            Flight Number

                                        </label>

                                        <input
                                            className="form-control"
                                            value={
                                                selectedFlight.flightNumber
                                            }
                                            disabled
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>

                                            Flight Name

                                        </label>

                                        <input
                                            className="form-control"
                                            value={
                                                selectedFlight.flightName
                                            }
                                            disabled
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>

                                            Total Seats

                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="totalSeats"
                                            value={
                                                selectedFlight.totalSeats
                                            }
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>

                                            Available Seats

                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="availableSeats"
                                            value={
                                                selectedFlight.availableSeats
                                            }
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    >

                                        Cancel

                                    </button>

                                    <button
                                        className="btn btn-success"
                                        onClick={handleUpdate}
                                    >

                                        Update Seats

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

export default OwnerManageSeats;