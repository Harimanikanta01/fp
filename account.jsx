import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
    const [data, setData] = useState({
        name: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            const response = await axios.post("http://localhost:9000/valid", data);
            console.log(response.data);
            setMessage(response.data.message || "Successfully stored");
        } catch (error) {
            console.error("Error:", error);
            setMessage("User already exists or an error occurred");
        }
    };

    useEffect(() => {
        if (message === "Successfully stored") {
            console.log("Account created");
        }
    }, [message]);

    return (
        <div style={styles.container}>
           
            <div style={styles.formContainer}>
            <h1 style={{color:'red'}}>Shopsy</h1>
                <h2 style={styles.heading}>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Enter name"
                            onChange={handleChange}
                            name="name"
                            value={data.name}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <input
                            type="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            name="password"
                            value={data.password}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        Create Account
                    </button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fc",
        fontFamily: "'Arial', sans-serif",
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "400px",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
    },
    inputContainer: {
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        outline: "none",
        transition: "border-color 0.3s",
    },
    input: {
        transition: "border 0.3s ease",
    },
    button: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#4CAF50",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        color: "#fff",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#45a049",
    },
    message: {
        marginTop: "15px",
        color: "#555",
        fontSize: "16px",
    }
};

export default Account;
