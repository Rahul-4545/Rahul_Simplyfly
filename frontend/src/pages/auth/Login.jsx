import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../services/authService";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

           const response = await loginUser(loginData);

console.log("Login Response:", response.data);

// Save Login Details

// Save Login Details
            // Save Login Details

           localStorage.setItem("token", response.data.token);
localStorage.setItem("userId", response.data.userId);
localStorage.setItem("role", response.data.role);
localStorage.setItem("email", response.data.email);
localStorage.setItem("name", response.data.name);

            alert("Login Successful");

            // Redirect Based on Role

            if (response.data.role === "ADMIN") {

                navigate("/admin/dashboard");

            }
            else if (response.data.role === "FLIGHT_OWNER") {

                navigate("/owner/dashboard");

            }
            else {

                navigate("/user/dashboard");

            }

        }
        catch (error) {

            console.log(error);

            alert("Invalid Email or Password");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            {/* LEFT SIDE */}

            <div className="login-left">

                <div className="overlay">

                    <div className="brand">

                        ✈ SimplyFly

                    </div>

                    <div className="hero-content">

                        <h1>

                            Your Journey
                            <br />
                            Starts <span>Here</span>

                        </h1>

                        <p>

                            Book flights easily.
                            Travel the world.
                            Create memories that last a lifetime.

                        </p>

                    </div>

                    <div className="feature-list">

                        <div className="feature">

                            <div className="feature-icon">

                                🛡️

                            </div>

                            <h4>

                                Secure Booking

                            </h4>

                            <p>

                                100% secure and encrypted

                            </p>

                        </div>

                        <div className="feature">

                            <div className="feature-icon">

                                🏷️

                            </div>

                            <h4>

                                Best Prices

                            </h4>

                            <p>

                                Exclusive airline offers

                            </p>

                        </div>

                        <div className="feature">

                            <div className="feature-icon">

                                🎧

                            </div>

                            <h4>

                                24×7 Support

                            </h4>

                            <p>

                                We're always here

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="login-right">

                <div className="login-card">

                    <div className="plane-circle">

                        ✈

                    </div>

                    <h2>

                        Welcome <span>Back!</span>

                    </h2>

                    <p>

                        Login to your SimplyFly account

                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">

                            <label>Email</label>

                            <div className="input-box">

                                <span>📧</span>

                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label>Password</label>

                            <div className="input-box">

                                <span>🔒</span>

                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />

                            </div>

                        </div>

                        <div
    className="forgot"
    onClick={() => navigate("/forgot-password")}
>

    Forgot Password?

</div>
                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >

                            {loading ? "Logging in..." : "Login →"}

                        </button>

                    </form>

                    <div className="divider">

                        <span>OR</span>

                    </div>

                    <button className="google-btn">

                        Continue with Google

                    </button>

                    <button className="apple-btn">

                        Continue with Apple

                    </button>

                    <div className="register">

                        Don't have an account?

                        <span onClick={() => navigate("/register")}>

                            Register

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;