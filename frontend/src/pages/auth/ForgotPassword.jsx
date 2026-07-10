import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../../services/authService";

import "./ForgotPassword.css";

function ForgotPassword() {

    const navigate = useNavigate();

    const [data, setData] = useState({

        email: "",

        newPassword: "",

        confirmPassword: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setData({

            ...data,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (data.newPassword !== data.confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        try {

            setLoading(true);

            await forgotPassword({

                email: data.email,

                newPassword: data.newPassword

            });

            alert("Password Updated Successfully");

            navigate("/login");

        }

        catch (error) {

    console.log("Error:", error);

    console.log("Response:", error.response);

    console.log("Data:", error.response?.data);

    alert(error.response?.data || "Unable to reset password");

}

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="forgot-page">

            <div className="forgot-card">

                <div className="plane-icon">

                    ✈

                </div>

                <h2>

                    Reset Password

                </h2>

                <p>

                    Enter your registered email and create a new password.

                </p>

                <form onSubmit={handleSubmit}>

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={data.email}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="password"

                        name="newPassword"

                        placeholder="New Password"

                        value={data.newPassword}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="password"

                        name="confirmPassword"

                        placeholder="Confirm Password"

                        value={data.confirmPassword}

                        onChange={handleChange}

                        required

                    />

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Updating..."

                            :

                            "Reset Password"

                        }

                    </button>

                </form>

                <div

                    className="back-login"

                    onClick={() => navigate("/login")}

                >

                    ← Back to Login

                </div>

            </div>

        </div>

    );

}

export default ForgotPassword;