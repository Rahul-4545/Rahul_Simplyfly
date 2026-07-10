import { useEffect, useState } from "react";

import { getFlights } from "../../services/flightService";

import FlightCard from "./FlightCard";

import "../../assets/styles/FeaturedFlights.css";

function FeaturedFlights() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {

        getFlights()

            .then((res) => {

                console.log(res.data);

                setFlights(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, []);

    return (

        <section className="featured-section">

            <h2>

                Featured Flights

            </h2>

            <div className="featured-grid">

                {

                    flights.map((flight) => (

                        <FlightCard

                            key={flight.flightId}

                            flight={flight}

                        />

                    ))

                }

            </div>

        </section>

    );

}

export default FeaturedFlights;