import "../../assets/styles/dashboard/Topbar.css";
import LogoutButton from "../layout/LogoutButton";

function Topbar() {

    const name = localStorage.getItem("name");

    return (

        <header className="topbar">

            <div>

                <h2>

                    Dashboard

                </h2>

            </div>

            <div className="topbar-right">

                <span>

                    Welcome, {name}

                </span>

                <LogoutButton />

            </div>

        </header>

    );

}

export default Topbar;