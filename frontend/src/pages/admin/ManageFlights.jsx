import { useEffect, useState } from "react";

import {
    getFlights,
    getFlightById,
    addFlight,
    updateFlight,
    deleteFlight,
    searchByFlightName,
    searchByOrigin,
    searchByDestination,
    sortFareAsc,
    sortFareDesc
} from "../../services/flightService";

function ManageFlights() {

    const [flights, setFlights] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [searchName, setSearchName] = useState("");

    const [origin, setOrigin] = useState("");

    const [destination, setDestination] = useState("");

    const [newFlight, setNewFlight] = useState({

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

        loadFlights();

    }, []);

    const loadFlights = async () => {

        try {

            const response = await getFlights();

            setFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleAddChange = (e) => {

        setNewFlight({

            ...newFlight,

            [e.target.name]: e.target.value

        });

    };

    const handleAddFlight = async () => {

        try {

            await addFlight(newFlight);

            alert("Flight Added Successfully");

            setShowAddModal(false);

            loadFlights();

            setNewFlight({

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

        }

        catch (error) {

            console.log(error);

            alert("Unable to Add Flight");

        }

    };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this flight?"
    );

    if (!confirmDelete) return;

    try {

        await deleteFlight(id);

        alert("Flight deleted successfully.");

        loadFlights();

    }
    catch (error) {

        console.log(error);

        if (error.response?.status === 500) {

            alert(
                "This flight cannot be deleted because it already has bookings associated with it."
            );

        }
        else {

            alert("Unable to delete flight.");

        }

    }

};
    const handleEditChange = (e) => {

        setSelectedFlight({

            ...selectedFlight,

            [e.target.name]: e.target.value

        });

    };

    const handleUpdate = async () => {

        try {

            await updateFlight(selectedFlight);

            alert("Flight Updated Successfully");

            setShowEditModal(false);

            loadFlights();

        }

        catch (error) {

            console.log(error);

            alert("Unable to Update Flight");

        }

    };

    const handleSearch = async () => {

        if (searchName.trim() === "") {

            loadFlights();

            return;

        }

        try {

            const response = await searchByFlightName(searchName);

            setFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

        const handleOrigin = async () => {

        if (origin.trim() === "") {

            loadFlights();

            return;

        }

        try {

            const response = await searchByOrigin(origin);

            setFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleDestination = async () => {

        if (destination.trim() === "") {

            loadFlights();

            return;

        }

        try {

            const response = await searchByDestination(destination);

            setFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleFareAsc = async () => {

        try {

            const response = await sortFareAsc();

            setFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleFareDesc = async () => {

        try {

            const response = await sortFareDesc();

            setFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleReset = () => {

        setSearchName("");

        setOrigin("");

        setDestination("");

        loadFlights();

    };

    return (

        <>

            <div className="container-fluid mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">

                        Manage Flights

                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >

                        + Add Flight

                    </button>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Search Flight Name"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
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

                                <input
                                    className="form-control"
                                    placeholder="Origin"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleOrigin}
                                >

                                    Origin

                                </button>

                            </div>

                            <div className="col-md-3">

                                <input
                                    className="form-control"
                                    placeholder="Destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />

                            </div>

                        </div>

                        <div className="row mb-4">

                            <div className="col-md-3">

                                <button
                                    className="btn btn-warning w-100"
                                    onClick={handleDestination}
                                >

                                    Destination

                                </button>

                            </div>

                            <div className="col-md-3">

                                <button
                                    className="btn btn-info w-100"
                                    onClick={handleFareAsc}
                                >

                                    Fare ↑

                                </button>

                            </div>

                            <div className="col-md-3">

                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={handleFareDesc}
                                >

                                    Fare ↓

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

                                    <th>Flight Name</th>

                                    <th>Flight No</th>

                                    <th>Origin</th>

                                    <th>Destination</th>

                                    <th>Fare</th>

                                    <th>Seats</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    flights.map((flight) => (

                                        <tr key={flight.flightId}>

                                            <td>{flight.flightId}</td>

                                            <td>{flight.flightName}</td>

                                            <td>{flight.flightNumber}</td>

                                            <td>{flight.origin}</td>

                                            <td>{flight.destination}</td>

                                            <td>₹ {flight.fare}</td>

                                            <td>

                                                {flight.availableSeats} / {flight.totalSeats}

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(flight.flightId)}
                                                >

                                                    Edit

                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(flight.flightId)}
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
            ADD FLIGHT MODAL
        ========================== */}

        {showAddModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Add Flight</h5>

                            <button
                                className="btn-close"
                                onClick={() => setShowAddModal(false)}
                            />

                        </div>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Flight Name</label>

                                    <input
                                        className="form-control"
                                        name="flightName"
                                        value={newFlight.flightName}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Flight Number</label>

                                    <input
                                        className="form-control"
                                        name="flightNumber"
                                        value={newFlight.flightNumber}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Origin</label>

                                    <input
                                        className="form-control"
                                        name="origin"
                                        value={newFlight.origin}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Destination</label>

                                    <input
                                        className="form-control"
                                        name="destination"
                                        value={newFlight.destination}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Departure Time</label>

                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="departureTime"
                                        value={newFlight.departureTime}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Arrival Time</label>

                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="arrivalTime"
                                        value={newFlight.arrivalTime}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Fare</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="fare"
                                        value={newFlight.fare}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Total Seats</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="totalSeats"
                                        value={newFlight.totalSeats}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Available Seats</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="availableSeats"
                                        value={newFlight.availableSeats}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Check-in Baggage (kg)</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="baggageCheckin"
                                        value={newFlight.baggageCheckin}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Cabin Baggage (kg)</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="baggageCabin"
                                        value={newFlight.baggageCabin}
                                        onChange={handleAddChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Owner ID</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="ownerId"
                                        value={newFlight.ownerId}
                                        onChange={handleAddChange}
                                    />

                                </div>

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
                                onClick={handleAddFlight}
                            >

                                Add Flight

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}
                {/* =========================
            EDIT FLIGHT MODAL
        ========================== */}

        {showEditModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Edit Flight</h5>

                            <button
                                className="btn-close"
                                onClick={() => setShowEditModal(false)}
                            />

                        </div>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Flight Name</label>

                                    <input
                                        className="form-control"
                                        name="flightName"
                                        value={selectedFlight.flightName}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Flight Number</label>

                                    <input
                                        className="form-control"
                                        name="flightNumber"
                                        value={selectedFlight.flightNumber}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Origin</label>

                                    <input
                                        className="form-control"
                                        name="origin"
                                        value={selectedFlight.origin}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Destination</label>

                                    <input
                                        className="form-control"
                                        name="destination"
                                        value={selectedFlight.destination}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Departure Time</label>

                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="departureTime"
                                        value={selectedFlight.departureTime}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Arrival Time</label>

                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="arrivalTime"
                                        value={selectedFlight.arrivalTime}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Fare</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="fare"
                                        value={selectedFlight.fare}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Total Seats</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="totalSeats"
                                        value={selectedFlight.totalSeats}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Available Seats</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="availableSeats"
                                        value={selectedFlight.availableSeats}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Check-in Baggage (kg)</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="baggageCheckin"
                                        value={selectedFlight.baggageCheckin}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Cabin Baggage (kg)</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="baggageCabin"
                                        value={selectedFlight.baggageCabin}
                                        onChange={handleEditChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Owner ID</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="ownerId"
                                        value={selectedFlight.ownerId}
                                        onChange={handleEditChange}
                                    />

                                </div>

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

                                Update Flight

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}

    </>

    );

}

export default ManageFlights;