import {
    FaPlaneDeparture,
    FaLock,
    FaBolt,
    FaHeadset
} from "react-icons/fa";

import "../../assets/styles/Features.css";

function Features() {

    const features = [

        {
            icon:<FaPlaneDeparture />,
            title:"Lowest Fare",
            desc:"Book flights at the best prices with exclusive discounts."
        },

        {
            icon:<FaLock />,
            title:"Secure Booking",
            desc:"100% secure online booking with encrypted payment."
        },

        {
            icon:<FaBolt />,
            title:"Instant Booking",
            desc:"Confirm your tickets within a few seconds."
        },

        {
            icon:<FaHeadset />,
            title:"24×7 Support",
            desc:"Customer support available anytime you need help."
        }

    ];

    return(

        <section className="feature-section">

            <h2>

                Why Choose SimplyFly

            </h2>

            <div className="feature-grid">

                {

                    features.map((item,index)=>(

                        <div
                            className="feature-card"
                            key={index}
                        >

                            <div className="feature-icon">

                                {item.icon}

                            </div>

                            <h3>

                                {item.title}

                            </h3>

                            <p>

                                {item.desc}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default Features;