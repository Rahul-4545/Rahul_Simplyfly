import { NavLink, Outlet, useNavigate } from "react-router-dom";

function UserLayout() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

                <div className="container-fluid">

                    <NavLink
                        className="navbar-brand fw-bold"
                        to="/user/dashboard"
                    >

                        ✈ SimplyFly

                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#userNavbar"
                    >

                        <span className="navbar-toggler-icon"></span>

                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="userNavbar"
                    >

                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/user/dashboard"
                                >

                                    Dashboard

                                </NavLink>

                            </li>

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/user/search"
                                >

                                    Search Flights

                                </NavLink>

                            </li>

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/user/bookings"
                                >

                                    My Bookings

                                </NavLink>

                            </li>

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/user/payments"
                                >

                                    Payments

                                </NavLink>

                            </li>

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/user/refunds"
                                >

                                    Refunds

                                </NavLink>

                            </li>

                        </ul>

                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >

                            Logout

                        </button>

                    </div>

                </div>

            </nav>

            <div className="container-fluid mt-4">

                <Outlet />

            </div>

        </>

    );

}

export default UserLayout;