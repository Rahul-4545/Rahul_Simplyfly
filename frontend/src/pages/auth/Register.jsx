import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        confirmPassword: "",
        role: "USER"
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [strength, setStrength] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });

        if (name === "password") {
            checkPasswordStrength(value);
        }

    };

    const checkPasswordStrength = (password) => {

        if (password.length < 6) {

            setStrength("Weak");

        }
        else if (
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/.test(password)
        ) {

            setStrength("Strong");

        }
        else {

            setStrength("Medium");

        }

    };

    const validate = () => {

        let temp = {};

        if (user.name.trim() === "") {
            temp.name = "Full Name is required";
        }

        if (!/\S+@\S+\.\S+/.test(user.email)) {
            temp.email = "Enter a valid email";
        }

        if (!/^[0-9]{10}$/.test(user.phone)) {
            temp.phone = "Phone number must contain 10 digits";
        }

        if (user.gender === "") {
            temp.gender = "Please select gender";
        }

        if (user.password.length < 8) {
            temp.password = "Password must contain minimum 8 characters";
        }

        if (user.password !== user.confirmPassword) {
            temp.confirmPassword = "Passwords do not match";
        }

        setErrors(temp);

        return Object.keys(temp).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {

            const payload = {

                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                password: user.password,
                role: user.role

            };

            await registerUser(payload);

            alert("Registration Successful!");

            navigate("/login");

        }
        catch (error) {

            console.log(error);

            if (error.response?.data) {

                alert(error.response.data);

            }
            else {

                alert("Registration Failed");

            }

        }
        finally {

            setLoading(false);

        }

    };
        return (

        <div className="register-page">

            {/* LEFT SIDE */}

            <div className="register-left">

                <div className="overlay">

                    <div className="brand">

                        ✈ SimplyFly

                    </div>

                    <div className="hero-content">

                        <h1>

                            Begin Your
                            <br />

                            Journey With
                            <br />

                            <span>SimplyFly</span>

                        </h1>

                        <p>

                            Register as a Passenger or Flight Owner
                            and experience fast, secure and seamless
                            flight booking and management.

                        </p>

                    </div>

                    <div className="feature-list">

                        <div className="feature">

                            <div className="feature-icon">

                                ✈

                            </div>

                            <h4>

                                Easy Booking

                            </h4>

                            <p>

                                Search & Book flights instantly

                            </p>

                        </div>

                        <div className="feature">

                            <div className="feature-icon">

                                💳

                            </div>

                            <h4>

                                Secure Payments

                            </h4>

                            <p>

                                Safe & Encrypted Transactions

                            </p>

                        </div>

                        <div className="feature">

                            <div className="feature-icon">

                                🌍

                            </div>

                            <h4>

                                Worldwide Travel

                            </h4>

                            <p>

                                Explore destinations with confidence

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="register-right">

                <div className="register-card">

                    <div className="plane-circle">

                        ✈

                    </div>

                    <h2>

                        Create <span>Account</span>

                    </h2>

                    <p>

                        Join SimplyFly today

                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">

                            <div className="input-box">

                                <span>👤</span>

                                <input

                                    type="text"

                                    name="name"

                                    placeholder="Full Name"

                                    value={user.name}

                                    onChange={handleChange}

                                />

                            </div>

                            <small>{errors.name}</small>

                        </div>

                        <div className="input-group">

                            <div className="input-box">

                                <span>📧</span>

                                <input

                                    type="email"

                                    name="email"

                                    placeholder="Email Address"

                                    value={user.email}

                                    onChange={handleChange}

                                />

                            </div>

                            <small>{errors.email}</small>

                        </div>

                        <div className="input-group">

                            <div className="input-box">

                                <span>📱</span>

                                <input

                                    type="text"

                                    name="phone"

                                    placeholder="Phone Number"

                                    value={user.phone}

                                    onChange={handleChange}

                                />

                            </div>

                            <small>{errors.phone}</small>

                        </div>

                        <div className="input-group">

                            <div className="input-box">

                                <span>👤</span>

                                <select

                                    name="gender"

                                    value={user.gender}

                                    onChange={handleChange}

                                >

                                    <option value="">

                                        Select Gender

                                    </option>

                                    <option value="Male">

                                        Male

                                    </option>

                                    <option value="Female">

                                        Female

                                    </option>

                                    <option value="Other">

                                        Other

                                    </option>

                                </select>

                            </div>

                            <small>{errors.gender}</small>

                        </div>

                        <div className="input-group">

                            <div className="input-box">

                                <span>🔒</span>

                                <input

                                    type="password"

                                    name="password"

                                    placeholder="Password"

                                    value={user.password}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="strength">

                                Password Strength :

                                <strong>

                                    {" "}

                                    {strength}

                                </strong>

                            </div>

                            <small>{errors.password}</small>

                        </div>

                        <div className="input-group">

                            <div className="input-box">

                                <span>✅</span>

                                <input

                                    type="password"

                                    name="confirmPassword"

                                    placeholder="Confirm Password"

                                    value={user.confirmPassword}

                                    onChange={handleChange}

                                />

                            </div>

                            <small>{errors.confirmPassword}</small>

                        </div>

                        <div className="role-section">

                            <label>

                                Register As

                            </label>

                            <div className="role-options">

                                <label className="role-card">

                                    <input

                                        type="radio"

                                        name="role"

                                        value="USER"

                                        checked={user.role === "USER"}

                                        onChange={handleChange}

                                    />

                                    <span>

                                        👤 Passenger

                                    </span>

                                </label>

                                <label className="role-card">

                                    <input

                                        type="radio"

                                        name="role"

                                        value="FLIGHT_OWNER"

                                        checked={user.role === "FLIGHT_OWNER"}

                                        onChange={handleChange}

                                    />

                                    <span>

                                        ✈ Flight Owner

                                    </span>

                                </label>

                            </div>

                        </div>

                        <button

                            type="submit"

                            className="register-btn"

                            disabled={loading}

                        >

                            {

                                loading

                                ?

                                "Creating Account..."

                                :

                                "Create Account →"

                            }

                        </button>

                    </form>

                    <div className="login-link">

                        Already have an account?

                        <span

                            onClick={() => navigate("/login")}

                        >

                            Login

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;