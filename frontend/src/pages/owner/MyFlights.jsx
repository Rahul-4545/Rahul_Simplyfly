import { useEffect, useState } from "react";

import {
    getFlightsByOwner,
    getFlightById,
    addFlight,
    updateFlight,
    deleteFlight
} from "../../services/flightService";

function MyFlights() {

    const [flights, setFlights] = useState([]);

    const [ownerId, setOwnerId] = useState(0);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

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

            const response = await getFlightsByOwner(id);

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

    // Flight Name
    if(newFlight.flightName.trim()===""){
        alert("Flight Name is required");
        return;
    }

    // Flight Number
    if(newFlight.flightNumber.trim()===""){
        alert("Flight Number is required");
        return;
    }

    // Origin
    if(newFlight.origin.trim()===""){
        alert("Origin is required");
        return;
    }

    // Destination
    if(newFlight.destination.trim()===""){
        alert("Destination is required");
        return;
    }

    if(newFlight.origin===newFlight.destination){
        alert("Origin and Destination cannot be same");
        return;
    }

    // Fare
    if(Number(newFlight.fare)<=0){
        alert("Fare must be greater than 0");
        return;
    }

    // Seats
    if(Number(newFlight.totalSeats)<=0){
        alert("Total Seats should be greater than 0");
        return;
    }

    if(Number(newFlight.availableSeats)>Number(newFlight.totalSeats)){
        alert("Available Seats cannot exceed Total Seats");
        return;
    }

    const departure = new Date(newFlight.departureTime);

if(departure <= new Date()){

    alert("Departure time must be in the future");

    return;

}
const arrival = new Date(newFlight.arrivalTime);

if(arrival <= departure){

    alert("Arrival time must be after Departure");

    return;

}

    try{

        await addFlight({

            ...newFlight,

            ownerId

        });

        alert("Flight Added Successfully");

        setShowAddModal(false);

        loadFlights(ownerId);

    }

    catch(error){

        console.log(error);

    }

};
    const handleDelete = async (id) => {

    if(!window.confirm("Delete this Flight?")){

        return;

    }

    try{

        await deleteFlight(id);

        alert("Flight Deleted Successfully");

        loadFlights(ownerId);

    }
    catch(error){

        console.log(error);

    }

}

    const handleUpdate = async () => {
         const departure = new Date(selectedFlight.departureTime);

if(departure <= new Date()){

    alert("Departure time must be in the future");

    return;

}
const arrival = new Date(selectedFlight.arrivalTime);

if(arrival <= departure){

    alert("Arrival time must be after Departure");

    return;

}

        try {

            await updateFlight({

                ...selectedFlight,

                ownerId: ownerId

            });

            alert("Flight Updated Successfully");

            setShowEditModal(false);

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

                    My Flights

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

                    <table className="table table-hover table-bordered align-middle">

                        <thead className="table-dark">

<tr>

<th>Flight No</th>

<th>Flight Name</th>

<th>Origin</th>

<th>Destination</th>

<th>Departure</th>

<th>Arrival</th>

<th>Fare</th>

<th>Cabin</th>

<th>Check-in</th>

<th>Total Seats</th>

<th>Available</th>

<th>Status</th>

<th>Actions</th>

</tr>

</thead>

                        <tbody>

                            {

                                flights.length > 0 ? (

                                    flights.map((flight) => (

                                        <tr key={flight.flightId}>

                                            <td>

{flight.flightNumber}

</td>

<td>

{flight.flightName}

</td>

<td>

{flight.origin}

</td>

<td>

{flight.destination}

</td>

<td>

{

new Date(

flight.departureTime

).toLocaleString()

}

</td>

<td>

{

new Date(

flight.arrivalTime

).toLocaleString()

}

</td>

<td>

₹ {flight.fare}

</td>

<td>

{flight.baggageCabin} kg

</td>

<td>

{flight.baggageCheckin} kg

</td>

<td>

{flight.totalSeats}

</td>

<td>

{flight.availableSeats}

</td>

<td>

{

flight.availableSeats===0

?

<span className="badge bg-danger">

FULL

</span>

:

flight.availableSeats<=5

?

<span className="badge bg-warning text-dark">

LOW SEATS

</span>

:

<span className="badge bg-success">

ACTIVE

</span>

}

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

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center text-muted"
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

                        {showAddModal && (

                <div
                    className="modal d-block"
                    style={{ background: "rgba(0,0,0,.5)" }}
                >

                    <div className="modal-dialog modal-lg">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5>

                                    Add Flight

                                </h5>

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

                        {showEditModal && (

                <div
                    className="modal d-block"
                    style={{ background: "rgba(0,0,0,.5)" }}
                >

                    <div className="modal-dialog modal-lg">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5>

                                    Edit Flight

                                </h5>

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

        </div>

    );

}

export default MyFlights;