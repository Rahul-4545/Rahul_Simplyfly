import "../../assets/styles/Destination.css";

const destinations = [

    {
        city: "Chennai",
        price: "₹3,499",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800"
    },

    {
        city: "Delhi",
        price: "₹4,299",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800"
    },

    {
        city: "Mumbai",
        price: "₹2,999",
        image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800"
    },

    {
        city: "Bangalore",
        price: "₹3,799",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800"
    }

];

function PopularDestinations() {

    return (

        <section className="destination-section">

            <h2>

                Popular Destinations

            </h2>

            <div className="destination-grid">

                {

                    destinations.map((item,index)=>(

                        <div
                            className="destination-card"
                            key={index}
                        >

                            <img
                                src={item.image}
                                alt={item.city}
                            />

                            <div className="destination-info">

                                <h3>

                                    ✈ {item.city}

                                </h3>

                                <p>

                                    Starting from

                                </p>

                               <h4>{item.price}</h4>

<div className="rating">

    ⭐⭐⭐⭐⭐

</div>

<button>

    Explore →

</button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default PopularDestinations;