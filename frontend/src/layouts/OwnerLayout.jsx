import { NavLink, Outlet, useNavigate } from "react-router-dom";

function OwnerLayout() {

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
                        to="/owner/dashboard"
                    >

                        ✈ SimplyFly Owner

                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#ownerNavbar"
                    >

                        <span className="navbar-toggler-icon"></span>

                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="ownerNavbar"
                    >

                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/owner/dashboard"
                                >

                                    Dashboard

                                </NavLink>

                            </li>

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/owner/flights"
                                >

                                    My Flights

                                </NavLink>

                            </li>
                            <li className="nav-item">

    <NavLink
        className="nav-link"
        to="/owner/seats"
    >

        Manage Seats

    </NavLink>

</li>

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/owner/bookings"
                                >

                                    My Bookings

                                </NavLink>

                            </li>
                            
<NavLink
    to="/owner/refunds"
    className="nav-link"
>

    💰 Refund Requests

</NavLink>
                            

                            <li className="nav-item">

                                <NavLink
                                    className="nav-link"
                                    to="/owner/revenue"
                                >

                                    Revenue

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

export default OwnerLayout;