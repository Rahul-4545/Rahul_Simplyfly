import { useNavigate } from "react-router-dom";

function LogoutButton() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <button
            onClick={logout}
            style={{
                padding:"10px 20px",
                border:"none",
                borderRadius:"8px",
                background:"#dc3545",
                color:"white",
                cursor:"pointer"
            }}
        >

            Logout

        </button>

    );

}

export default LogoutButton;