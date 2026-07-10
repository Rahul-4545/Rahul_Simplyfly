import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { addBooking ,bookingExists} from "../../services/bookingService";

function BookFlight() {

    const location = useLocation();

    const navigate = useNavigate();

    const flight = location.state?.flight;

    const userId = Number(localStorage.getItem("userId"));

    const [loading, setLoading] = useState(false);

    const [booking, setBooking] = useState({

        userId: userId,

        flightId: flight?.flightId || "",

        bookingDate: new Date()
            .toISOString()
            .slice(0, 16),

        totalAmount: flight?.fare || 0,

        bookingStatus: "CONFIRMED"

    });

    const handleChange = (e) => {

        setBooking({

            ...booking,

            [e.target.name]: e.target.value

        });

    };

    const handleBooking = async () => {

    try {

        setLoading(true);

        const exists = await bookingExists(

            booking.userId,

            booking.flightId

        );

        if (exists.data) {

            alert("You have already booked this flight.");

            return;

        }

        await addBooking(booking);

        alert("Booking Created Successfully ✈");

        navigate("/user/bookings");

    }

    catch (error) {

        console.log(error);

        alert("Booking Failed");

    }

    finally {

        setLoading(false);

    }

};



    if (!flight) {

        return (

            <div className="container mt-5">

                <div className="alert alert-warning">

                    <h4>No Flight Selected</h4>

                    <p>

                        Please search and select a flight first.

                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/user/search")}
                    >

                        Back To Search

                    </button>

                </div>

            </div>

        );

    }
        return (

        <div className="container mt-4">

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">

                        ✈ Confirm Flight Booking

                    </h3>

                </div>

                <div className="card-body">

                    <div className="row">

                        {/* Flight Details */}

                        <div className="col-md-7">

                            <h5 className="fw-bold mb-3">

                                Flight Details

                            </h5>

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>

                                        <th width="35%">

                                            Flight Number

                                        </th>

                                        <td>

                                            {flight.flightNumber}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Flight Name

                                        </th>

                                        <td>

                                            {flight.flightName}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Origin

                                        </th>

                                        <td>

                                            {flight.origin}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Destination

                                        </th>

                                        <td>

                                            {flight.destination}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Departure

                                        </th>

                                        <td>

                                            {flight.departureTime}

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Available Seats

                                        </th>

                                        <td>

                                            <span className="badge bg-success fs-6">

                                                {flight.availableSeats}

                                            </span>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                                                {/* Booking Summary */}

                        <div className="col-md-5">

                            <div className="card bg-light border">

                                <div className="card-header">

                                    <h5 className="mb-0">

                                        Booking Summary

                                    </h5>

                                </div>

                                <div className="card-body">

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Booking Date

                                        </label>

                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            name="bookingDate"
                                            value={booking.bookingDate}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Fare

                                        </label>

                                        <input
                                            className="form-control"
                                            value={`₹ ${flight.fare}`}
                                            disabled
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Total Amount

                                        </label>

                                        <input
                                            className="form-control fw-bold"
                                            value={`₹ ${booking.totalAmount}`}
                                            disabled
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Booking Status

                                        </label>

                                        <input
                                            className="form-control"
                                            value={booking.bookingStatus}
                                            disabled
                                        />

                                    </div>

                                    {

                                        flight.availableSeats > 0 ?

                                        (

                                            <div className="alert alert-success">

                                                Seats Available :
                                                <strong>

                                                    {" "}

                                                    {flight.availableSeats}

                                                </strong>

                                            </div>

                                        )

                                        :

                                        (

                                            <div className="alert alert-danger">

                                                No Seats Available

                                            </div>

                                        )

                                    }

                                </div>

                            </div>

                        </div>

                    </div>

                    <hr />

                                        <div className="d-flex justify-content-end gap-2">

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/user/search")}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-success"
                            onClick={handleBooking}
                            disabled={
                                loading ||
                                flight.availableSeats <= 0
                            }
                        >

                            {

                                loading

                                    ?

                                    "Booking..."

                                    :

                                    "Confirm Booking"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default BookFlight;