import { useEffect, useState } from "react";
import {
    Bar,
    Pie,
    Doughnut
} from "react-chartjs-2";

import {
    getUsers,
    getFlights,
    getBookings,
    getPayments,
    getRefunds
} from "../../services/reportService";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    ArcElement,

    Title,

    Tooltip,

    Legend

);
function Reports() {

    const [totalUsers, setTotalUsers] = useState(0);

    const [totalFlights, setTotalFlights] = useState(0);

    const [totalBookings, setTotalBookings] = useState(0);

    const [totalPayments, setTotalPayments] = useState(0);

    const [totalRefunds, setTotalRefunds] = useState(0);

    const [totalRevenue, setTotalRevenue] = useState(0);

    const [bookings, setBookings] = useState([]);

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const usersResponse =
                await getUsers();

            const flightsResponse =
                await getFlights();

            const bookingsResponse =
                await getBookings();

            const paymentsResponse =
                await getPayments();

            const refundsResponse =
                await getRefunds();

            setTotalUsers(
                usersResponse.data.length
            );

            setTotalFlights(
                flightsResponse.data.length
            );

            setTotalBookings(
                bookingsResponse.data.length
            );

            setTotalPayments(
                paymentsResponse.data.length
            );

            setTotalRefunds(
                refundsResponse.data.length
            );

            setBookings(
                bookingsResponse.data
            );

            setPayments(
                paymentsResponse.data
            );

            let revenue = 0;

            paymentsResponse.data.forEach(payment => {

                revenue += payment.amount;

            });

            setTotalRevenue(revenue);

        }

        catch(error){

            console.log(error);

        }

    };

    return (

        <div className="container-fluid mt-4">

            <h2 className="fw-bold mb-4">

                Reports Dashboard

            </h2>

                        <div className="row g-4">

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 bg-primary text-white">

                        <div className="card-body">

                            <h6>Total Users</h6>

                            <h2>{totalUsers}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 bg-success text-white">

                        <div className="card-body">

                            <h6>Total Flights</h6>

                            <h2>{totalFlights}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 bg-warning text-dark">

                        <div className="card-body">

                            <h6>Total Bookings</h6>

                            <h2>{totalBookings}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 bg-info text-white">

                        <div className="card-body">

                            <h6>Total Payments</h6>

                            <h2>{totalPayments}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 bg-danger text-white">

                        <div className="card-body">

                            <h6>Total Refunds</h6>

                            <h2>{totalRefunds}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 bg-dark text-white">

                        <div className="card-body">

                            <h6>Total Revenue</h6>

                            <h2>

                                ₹ {totalRevenue.toLocaleString()}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <hr className="my-5" />

                        <div className="row mt-4">

                <div className="col-lg-12">

                    <div className="card shadow">

                        <div className="card-header">

                            <h5 className="mb-0">

                                Monthly Revenue

                            </h5>

                        </div>

                        <div className="card-body">

                            <Bar

                                data={{

                                    labels: [

                                        "Jan",

                                        "Feb",

                                        "Mar",

                                        "Apr",

                                        "May",

                                        "Jun",

                                        "Jul",

                                        "Aug",

                                        "Sep",

                                        "Oct",

                                        "Nov",

                                        "Dec"

                                    ],

                                    datasets: [

                                        {

                                            label: "Revenue",

                                            data: [

                                                totalRevenue * 0.05,

                                                totalRevenue * 0.08,

                                                totalRevenue * 0.10,

                                                totalRevenue * 0.12,

                                                totalRevenue * 0.09,

                                                totalRevenue * 0.15,

                                                totalRevenue * 0.11,

                                                totalRevenue * 0.07,

                                                totalRevenue * 0.06,

                                                totalRevenue * 0.05,

                                                totalRevenue * 0.06,

                                                totalRevenue * 0.06

                                            ],

                                            backgroundColor: "#0d6efd"

                                        }

                                    ]

                                }}

                                options={{

                                    responsive: true,

                                    plugins: {

                                        legend: {

                                            position: "top"

                                        }

                                    }

                                }}

                            />

                        </div>

                    </div>

                </div>

            </div>
            <div className="row mt-5">

                <div className="col-lg-6">

                    <div className="card shadow">

                        <div className="card-header">

                            <h5>

                                Booking Status

                            </h5>

                        </div>

                        <div className="card-body">

                            <Pie

                                data={{

                                    labels: [

                                        "Confirmed",

                                        "Pending",

                                        "Cancelled"

                                    ],

                                    datasets: [

                                        {

                                            data: [

                                                bookings.filter(

                                                    booking => booking.bookingStatus === "CONFIRMED"

                                                ).length,

                                                bookings.filter(

                                                    booking => booking.bookingStatus === "PENDING"

                                                ).length,

                                                bookings.filter(

                                                    booking => booking.bookingStatus === "CANCELLED"

                                                ).length

                                            ],

                                            backgroundColor: [

                                                "#198754",

                                                "#ffc107",

                                                "#dc3545"

                                            ]

                                        }

                                    ]

                                }}

                            />

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow">

                        <div className="card-header">

                            <h5>

                                Payment Status

                            </h5>

                        </div>

                        <div className="card-body">

                            <Doughnut

                                data={{

                                    labels: [

                                        "Success",

                                        "Pending",

                                        "Failed"

                                    ],

                                    datasets: [

                                        {

                                            data: [

                                                payments.filter(

                                                    payment => payment.paymentStatus === "SUCCESS"

                                                ).length,

                                                payments.filter(

                                                    payment => payment.paymentStatus === "PENDING"

                                                ).length,

                                                payments.filter(

                                                    payment => payment.paymentStatus === "FAILED"

                                                ).length

                                            ],

                                            backgroundColor: [

                                                "#198754",

                                                "#ffc107",

                                                "#dc3545"

                                            ]

                                        }

                                    ]

                                }}

                            />

                        </div>

                    </div>

                </div>

            </div>
                        <div className="row mt-5">

                <div className="col-lg-6">

                    <div className="card shadow">

                        <div className="card-header">

                            <h5>

                                Recent Bookings

                            </h5>

                        </div>

                        <div className="card-body">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>User</th>

                                        <th>Flight</th>

                                        <th>Amount</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        bookings

                                            .slice(0, 5)

                                            .map((booking) => (

                                                <tr key={booking.bookingId}>

                                                    <td>

                                                        {booking.bookingId}

                                                    </td>

                                                    <td>

                                                        {booking.user.userId}

                                                    </td>

                                                    <td>

                                                        {booking.flight.flightNumber}

                                                    </td>

                                                    <td>

                                                        ₹ {booking.totalAmount}

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${
                                                                booking.bookingStatus === "CONFIRMED"
                                                                    ? "bg-success"
                                                                    : booking.bookingStatus === "PENDING"
                                                                    ? "bg-warning text-dark"
                                                                    : "bg-danger"
                                                            }`}
                                                        >

                                                            {booking.bookingStatus}

                                                        </span>

                                                    </td>

                                                </tr>

                                            ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow">

                        <div className="card-header">

                            <h5>

                                Top Payments

                            </h5>

                        </div>

                        <div className="card-body">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Booking</th>

                                        <th>Method</th>

                                        <th>Amount</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        [...payments]

                                            .sort((a, b) => b.amount - a.amount)

                                            .slice(0, 5)

                                            .map((payment) => (

                                                <tr key={payment.paymentId}>

                                                    <td>

                                                        {payment.paymentId}

                                                    </td>

                                                    <td>

                                                        {payment.booking.bookingId}

                                                    </td>

                                                    <td>

                                                        {payment.paymentMethod}

                                                    </td>

                                                    <td>

                                                        ₹ {payment.amount}

                                                    </td>

                                                </tr>

                                            ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Reports;
