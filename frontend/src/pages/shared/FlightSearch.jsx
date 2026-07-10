import "../../assets/styles/FlightSearch.css";

function FlightSearch() {

    return (

        <section className="search-section">

            <div className="search-card">

                <h2>Search Flights</h2>

                <div className="search-grid">

                    <div>

                        <label>From</label>

                        <input
                            type="text"
                            placeholder="Departure City"
                        />

                    </div>

                    <div>

                        <label>To</label>

                        <input
                            type="text"
                            placeholder="Destination City"
                        />

                    </div>

                    <div>

                        <label>Departure</label>

                        <input
                            type="date"
                        />

                    </div>

                    <div>

                        <label>Passengers</label>

                        <select>

                            <option>1 Passenger</option>
                            <option>2 Passengers</option>
                            <option>3 Passengers</option>
                            <option>4 Passengers</option>

                        </select>

                    </div>

                </div>

                <button>

                    Search Flights

                </button>

            </div>

        </section>

    );

}

export default FlightSearch;