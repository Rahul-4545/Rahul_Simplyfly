import { NavLink } from "react-router-dom";

import "../../assets/styles/dashboard/Sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <h2>

                ✈ SimplyFly

            </h2>

            <NavLink to="/admin/dashboard">

                Dashboard

            </NavLink>

            <NavLink to="/admin/users">

                Users

            </NavLink>

            <NavLink to="/admin/flights">

                Flights

            </NavLink>
            <NavLink to="/admin/bookings">

    Bookings

</NavLink>
<NavLink to="/admin/payments">

    Payments

</NavLink>

            <NavLink to="/admin/refunds">

                Refunds

            </NavLink>

            <NavLink to="/admin/reports">

                Reports

            </NavLink>

        </aside>

    );

}

export default Sidebar;