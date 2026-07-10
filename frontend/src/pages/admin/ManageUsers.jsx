import { useEffect, useState } from "react";

import {
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    addUser
} from "../../services/userService";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState({

        userId: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        role: ""

    });
    const [showAddModal, setShowAddModal] = useState(false);

const [newUser, setNewUser] = useState({

    name: "",

    email: "",

    password: "",

    phone: "",

    gender: "Male",

    role: "USER"

});

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await deleteUser(id);

            alert("User Deleted Successfully");

            loadUsers();

        }

        catch (error) {

            console.log(error);

            alert("Unable to delete user");

        }

    };

    const handleEdit = async (id) => {

        try {

            const response = await getUserById(id);

            setSelectedUser(response.data);

            setShowModal(true);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setSelectedUser({

            ...selectedUser,

            [e.target.name]: e.target.value

        });

    };

    const handleUpdate = async () => {

        try {

            await updateUser(selectedUser);

            alert("User Updated Successfully");

            setShowModal(false);

            loadUsers();

        }

        catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };
    const handleAddChange = (e) => {

    setNewUser({

        ...newUser,

        [e.target.name]: e.target.value

    });

};

const handleAddUser = async () => {

    try {

        await addUser(newUser);

        alert("User Added Successfully");

        setShowAddModal(false);

        loadUsers();

        setNewUser({

            name: "",

            email: "",

            password: "",

            phone: "",

            gender: "Male",

            role: "USER"

        });

    }

    catch (error) {

        console.log(error);

        alert("Unable to Add User");

    }

};
return (

    <>

        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    Manage Users

                </h2>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                >

                    + Add User

                </button>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover table-bordered align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Phone</th>

                                <th>Role</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                users.map((user) => (

                                    <tr key={user.userId}>

                                        <td>{user.userId}</td>

                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>{user.phone}</td>

                                        <td>

                                            <span
                                                className={`badge ${
                                                    user.role === "ADMIN"
                                                        ? "bg-danger"
                                                        : user.role === "FLIGHT_OWNER"
                                                        ? "bg-warning text-dark"
                                                        : "bg-success"
                                                }`}
                                            >

                                                {user.role}

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEdit(user.userId)}
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(user.userId)}
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

        {/* Edit User Modal */}

        {showModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Edit User</h5>

                            <button
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            />

                        </div>

                        <div className="modal-body">

                            <input
                                className="form-control mb-3"
                                name="name"
                                value={selectedUser.name}
                                onChange={handleChange}
                                placeholder="Name"
                            />

                            <input
                                className="form-control mb-3"
                                name="email"
                                value={selectedUser.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />

                            <input
                                className="form-control mb-3"
                                name="password"
                                value={selectedUser.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />

                            <input
                                className="form-control mb-3"
                                name="phone"
                                value={selectedUser.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                            />

                            <input
                                className="form-control mb-3"
                                name="gender"
                                value={selectedUser.gender}
                                onChange={handleChange}
                                placeholder="Gender"
                            />

                            <select
                                className="form-select"
                                name="role"
                                value={selectedUser.role}
                                onChange={handleChange}
                            >

                                <option value="ADMIN">ADMIN</option>

                                <option value="FLIGHT_OWNER">FLIGHT_OWNER</option>

                                <option value="USER">USER</option>

                            </select>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >

                                Cancel

                            </button>

                            <button
                                className="btn btn-success"
                                onClick={handleUpdate}
                            >

                                Update

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        )}

        {/* Add User Modal */}

        {showAddModal && (

            <div
                className="modal d-block"
                style={{ background: "rgba(0,0,0,.5)" }}
            >

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5>Add User</h5>

                            <button
                                className="btn-close"
                                onClick={() => setShowAddModal(false)}
                            />

                        </div>

                        <div className="modal-body">

                            <input
                                className="form-control mb-3"
                                placeholder="Name"
                                name="name"
                                value={newUser.name}
                                onChange={handleAddChange}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Email"
                                name="email"
                                value={newUser.email}
                                onChange={handleAddChange}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Password"
                                name="password"
                                value={newUser.password}
                                onChange={handleAddChange}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Phone"
                                name="phone"
                                value={newUser.phone}
                                onChange={handleAddChange}
                            />

                            <select
                                className="form-select mb-3"
                                name="gender"
                                value={newUser.gender}
                                onChange={handleAddChange}
                            >

                                <option value="Male">Male</option>

                                <option value="Female">Female</option>

                            </select>

                            <select
                                className="form-select"
                                name="role"
                                value={newUser.role}
                                onChange={handleAddChange}
                            >

                                <option value="ADMIN">ADMIN</option>

                                <option value="FLIGHT_OWNER">FLIGHT_OWNER</option>

                                <option value="USER">USER</option>

                            </select>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowAddModal(false)}
                            >

                                Cancel

                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={handleAddUser}
                            >

                                Add User

                            </button>

                        </div>

                    </div>

                </div>

            </div>

               )}

    </>

);

}

export default ManageUsers;