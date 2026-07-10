import { useEffect, useState } from "react";

import {
    getFlightsByOwner
} from "../../services/flightService";

function OwnerDashboard() {

    const [myFlights, setMyFlights] = useState([]);

    const [ownerId, setOwnerId] = useState(0);

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

            setMyFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container-fluid mt-4">

            <h2 className="fw-bold">

                Flight Owner Dashboard

            </h2>

            <p className="text-muted">

                Welcome Flight Owner 👋

            </p>

                        <div className="row mt-4 g-4">

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 bg-primary text-white">

                        <div className="card-body text-center">

                            <h6>

                                My Flights

                            </h6>

                            <h2>

                                {myFlights.length}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 bg-success text-white">

                        <div className="card-body text-center">

                            <h6>

                                Available Seats

                            </h6>

                            <h2>

                                {

                                    myFlights.reduce(

                                        (total, flight) =>

                                            total + flight.availableSeats,

                                        0

                                    )

                                }

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 bg-warning text-dark">

                        <div className="card-body text-center">

                            <h6>

                                Total Seats

                            </h6>

                            <h2>

                                {

                                    myFlights.reduce(

                                        (total, flight) =>

                                            total + flight.totalSeats,

                                        0

                                    )

                                }

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 bg-info text-white">

                        <div className="card-body text-center">

                            <h6>

                                Average Fare

                            </h6>

                            <h2>

                                ₹ {

                                    myFlights.length > 0

                                        ? Math.round(

                                            myFlights.reduce(

                                                (total, flight) =>

                                                    total + flight.fare,

                                                0

                                            ) / myFlights.length

                                        )

                                        : 0

                                }

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <hr className="my-5" />
                        <div className="card shadow">

                <div className="card-header bg-dark text-white">

                    <h5 className="mb-0">

                        My Flights

                    </h5>

                </div>

                <div className="card-body">

                    <table className="table table-hover table-bordered align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Flight No</th>

                                <th>Flight Name</th>

                                <th>Origin</th>

                                <th>Destination</th>

                                <th>Fare</th>

                                <th>Total Seats</th>

                                <th>Available Seats</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                myFlights.length > 0 ? (

                                    myFlights.map((flight) => (

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

                                                {flight.origin}

                                            </td>

                                            <td>

                                                {flight.destination}

                                            </td>

                                            <td>

                                                ₹ {flight.fare}

                                            </td>

                                            <td>

                                                {flight.totalSeats}

                                            </td>

                                            <td>

                                                {flight.availableSeats}

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center text-muted"
                                        >

                                            No Flights Available

                                        </td>

                                    </tr>

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

                        <div className="row mt-4">

                <div className="col-lg-12">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h5 className="mb-0">

                                Flight Summary

                            </h5>

                        </div>

                        <div className="card-body">

                            <div className="row text-center">

                                <div className="col-md-4">

                                    <h3 className="text-primary">

                                        {myFlights.length}

                                    </h3>

                                    <p>

                                        Total Flights

                                    </p>

                                </div>

                                <div className="col-md-4">

                                    <h3 className="text-success">

                                        {

                                            myFlights.reduce(

                                                (total, flight) =>

                                                    total + flight.availableSeats,

                                                0

                                            )

                                        }

                                    </h3>

                                    <p>

                                        Available Seats

                                    </p>

                                </div>

                                <div className="col-md-4">

                                    <h3 className="text-warning">

                                        ₹ {

                                            myFlights.reduce(

                                                (total, flight) =>

                                                    total + flight.fare,

                                                0

                                            )

                                        }

                                    </h3>

                                    <p>

                                        Total Flight Value

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default OwnerDashboard;