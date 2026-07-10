import { Link } from "react-router-dom";

import "../../assets/styles/Navbar.css";

function Navbar() {

    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >

                ✈ SimplyFly

            </Link>

            <div className="auth-buttons">

                <Link to="/login">

                    <button className="login-btn">

                        Login

                    </button>

                </Link>

                <Link to="/register">

                    <button className="register-btn">

                        Register

                    </button>

                </Link>

            </div>

        </nav>

    );

}

export default Navbar;