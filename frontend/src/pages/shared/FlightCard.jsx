import "./FlightCard.css";

function FlightCard({ flight }) {

    return (

        <div className="flight-card">

            <div className="airline-name">

                ✈ {flight.flightName}

            </div>

            <div className="flight-route">

                <div>

                    <h3>{flight.origin}</h3>

                    <small>Departure</small>

                </div>

                <div className="arrow">

                    ✈────➜

                </div>

                <div>

                    <h3>{flight.destination}</h3>

                    <small>Arrival</small>

                </div>

            </div>

            <div className="flight-info">

                <div>

                    <span>Flight No</span>

                    <strong>{flight.flightNumber}</strong>

                </div>

                <div>

                    <span>Seats</span>

                    <strong>{flight.availableSeats}</strong>

                </div>

            </div>

            <div className="flight-info">

                <div>

                    <span>Baggage</span>

                    <strong>{flight.baggageCabin} kg</strong>

                </div>

                <div>

                    <span>Check-in</span>

                    <strong>{flight.baggageCheckin} kg</strong>

                </div>

            </div>

            <div className="flight-footer">

                <div>

                    <small>Starting From</small>

                    <h2>

                        ₹ {flight.fare}

                    </h2>

                </div>

                <button>

                    Book Now

                </button>

            </div>

        </div>

    );

}

export default FlightCard;