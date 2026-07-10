import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {

    getFlights,

    searchByOrigin,

    searchByDestination,

    getFlightsByOriginDestination

} from "../../services/flightService";

function SearchFlights() {
    const navigate = useNavigate();

    const [flights, setFlights] = useState([]);

    const [origin, setOrigin] = useState("");

    const [destination, setDestination] = useState("");
    const [journeyDate, setJourneyDate] = useState("");

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

    const handleSearch = async () => {

        try {

            let response;

            if (

                origin !== "" &&

                destination !== ""

            ) {

                response =

                    await getFlightsByOriginDestination(

                        origin,

                        destination

                    );

            }

            else if (origin !== "") {

                response =

                   await searchByOrigin(origin);

            }

            else if (destination !== "") {

                response =

                     await searchByDestination(destination);

            }

            else {

                loadFlights();

                return;

            }

            setFlights(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleBook = (flight) => {

    navigate(

        "/user/book",

        {

            state: {

                flight

            }

        }

    );

};

const today = new Date().toISOString().split("T")[0];
        return (

        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    Search Flights

                </h2>

            </div>

            <div className="card shadow mb-4">

                <div className="card-body">

                    <div className="row g-3">

    <div className="col-md-3">

        <input
            type="text"
            className="form-control"
            placeholder="Origin"
            value={origin}
            onChange={(e)=>setOrigin(e.target.value)}
        />

    </div>

    <div className="col-md-3">

        <input
            type="text"
            className="form-control"
            placeholder="Destination"
            value={destination}
            onChange={(e)=>setDestination(e.target.value)}
        />

    </div>

    <div className="col-md-2">

        <input
            type="date"
            className="form-control"
            value={journeyDate}
            min={today}
            onChange={(e)=>setJourneyDate(e.target.value)}
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
            onClick={() => {

                setOrigin("");

                setDestination("");

                setJourneyDate("");

                loadFlights();

            }}
        >

            Reset

        </button>

    </div>

</div>

                </div>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover table-bordered align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>Flight No</th>

                                <th>Flight</th>

                                <th>Origin</th>

                                <th>Destination</th>

                                <th>Departure</th>

                                <th>Fare</th>
                                <th>Cabin</th>

<th>Check-in</th>

                                <th>Available Seats</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                flights.length > 0 ?

                                (

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

                                                {flight.departureTime}

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

                                                {flight.availableSeats}

                                            </td>

                                            <td>
<button

className={
    flight.availableSeats === 0
        ? "btn btn-danger btn-sm"
        : "btn btn-success btn-sm"
}

disabled={flight.availableSeats === 0}

onClick={() => handleBook(flight)}

>

{

flight.availableSeats === 0

?

"Sold Out"

:

"Book Now"

}

</button>

                                            </td>

                                        </tr>

                                    ))

                                )

                                :

                                (

                                    <tr>

                                        <td
                                            colSpan="8"
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
            </div>

        

    );

}

export default SearchFlights;
