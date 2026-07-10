import { NavLink } from "react-router-dom";

function OwnerSidebar() {

    return (

        <aside className="sidebar">

            <h2>✈ SimplyFly</h2>

            <NavLink to="/owner/dashboard">

                Dashboard

            </NavLink>

            <NavLink to="/owner/flights">

                My Flights

            </NavLink>

            <NavLink to="/owner/bookings">

    My Bookings

</NavLink>

            <NavLink to="/owner/revenue">

                Revenue

            </NavLink>

        </aside>

    );

}

export default OwnerSidebar;