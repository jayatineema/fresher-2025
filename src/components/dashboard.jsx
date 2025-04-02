import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAllUsers, addUser, deleteUser, updateUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({ name: "", lastname: "", age: "" });
    const [editingUser, setEditingUser] = useState(null);

    // Fetch users
    const { data: users, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: fetchAllUsers,
    });

    // Mutations
    const addMutation = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            console.log("User added successfully");
            refetch();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            console.log("User deleted successfully");
            refetch();
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            console.log("User updated successfully");
            refetch();
            setEditingUser(null);
        },
    });

    // Add User
    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.lastname || !newUser.age) {
            alert("All fields are required");
            return;
        }
        addMutation.mutate(newUser);
        setNewUser({ name: "", lastname: "", age: "" });
    };

    // Update User
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!editingUser?.id) {
            console.error("User ID is missing");
            return;
        }
        updateMutation.mutate(editingUser);
    };

    // Delete User
    const handleDelete = (userId) => {
        // console.log("Deleting user with ID:", userId);
        alert("Are you Sure");
        deleteMutation.mutate(userId);
    };

    // Handle input changes for editing user
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingUser((prev) => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error loading users: {error.message}</p>;

    return (
        <div style={styles.container}>
            <h2>Users Dashboard</h2>

            <button onClick={() => navigate("/login")} style={styles.logoutButton}>Logout</button>

            {/* Add New User */}
            <div style={styles.formContainer}>
                <h3>Add New User</h3>
                <form onSubmit={handleAddSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newUser.lastname}
                        onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={newUser.age}
                        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                        required
                    />
                    <button type="submit">Add User</button>
                </form>
            </div>

            {/* Update User */}
            {editingUser && (
                <div style={styles.formContainer}>
                    <h3>Update User</h3>
                    <form onSubmit={handleUpdateSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={editingUser.name}
                            onChange={handleEditChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastname"
                            value={editingUser.lastname}
                            onChange={handleEditChange}
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            value={editingUser.age}
                            onChange={handleEditChange}
                            required
                        />
                        <button type="submit">Update User</button>
                        <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                    </form>
                </div>
            )}

            {/* User Table */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.age}</td>
                            <td>
                                <button onClick={() => setEditingUser({ ...user })} style={styles.editbutton}>Edit</button>
                                <button onClick={() => handleDelete(user.id)} style={styles.deletebutton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const styles = {
    container: {
        backgroundColor: "white",
        padding: "20px",
        color: "black",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh", // Ensures it grows if content overflows
        width: "100vw",
        overflow: "auto", // Enables scrolling if needed
    },

    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "black",
    },

    logoutButton: {
        padding: "10px 20px",
        backgroundColor: "#ff5722",
        color: "black",
        border: "none",
        cursor: "pointer",
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: "1000",
    },

    formContainer: {
        backgroundColor: "white",
        margin: "20px 0",
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
        color: "black",
        width: "fit-content",
    },

    table: {
        margin: "20px auto",
        borderCollapse: "collapse",
        width: "80%",
        color: "black",
    },

    deletebutton: {
        color: "red",
        backgroundColor: "black",
    },

    editbutton: {
        color: "blue",
        backgroundColor: "black",
    },
};



export default Dashboard; 