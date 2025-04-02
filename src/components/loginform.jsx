import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; 
import InputField from "./inputField";
import Button from "./Button";
import { fetchUserData, loginUser } from "../services/api";

const LoginForm = () => {
    const navigate = useNavigate(); 

    const { data: usersData, isLoading: usersLoading, isError: usersError, error: usersErrorMsg } = useQuery({
        queryKey: ["usersData"], 
        queryFn: fetchUserData,  
    });

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
         
            localStorage.setItem("token", data.accessToken);
            console.log(data);
            alert("Login successful!");
            
            navigate("/dashboard");  
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            alert(errorMessage);
        },
    });

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData); 
    };

    if (usersLoading) return <p>Loading users data...</p>;
    if (usersError) return <p>Error loading users: {usersErrorMsg?.message || "Something went wrong."}</p>;

    return (
        <div style={styles.container}>
            <h2>LOGIN FORM</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <InputField
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <InputField
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button text={mutation.isLoading ? "Logging in..." : "Login"} disabled={mutation.isLoading} />
            </form>
            {mutation.isSuccess && (
                <div style={styles.successMessage}>
                    <p>Login successful!</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: "300px",
        margin: "100px auto", 
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)", 
    },
    form: {
        display: "flex",
        flexDirection: "column",
       margin : "20px 20px 20px 20px"
         
    },
    successMessage: {
        marginTop: "20px",
        color: "green",
        fontSize: "14px",
        fontWeight: "bold",
    }
};

export default LoginForm;
