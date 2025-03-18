import React, { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';

export const Acontext = createContext();

function Create({ children }) {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");

    if (token) {
        navigate("/");
    }

    const submit = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const wsubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9000/login", data);
            setToken(response.data.token);
        } catch (error) {
            console.error("No account found", error);
            setMessage("No Account Found");
        }
    };

    return (
        <>
            <div className="bg1">
                <h1 style={styles.header}>Shopsy</h1>
            </div>
            <div className="login-container">
                {message && <p style={styles.errorMessage}>{message}</p>}
                <Acontext.Provider value={{ token }}>
                    {children} 
                </Acontext.Provider>
                <div className="login-card" style={styles.loginCard}>
                    <form onSubmit={wsubmit}>
                        <h3 style={styles.formTitle}>Login</h3>
                        <div style={styles.inputContainer}>
                            <label htmlFor="name">Enter Name</label>
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="Enter your name" 
                                onChange={submit} 
                                name="name" 
                                required 
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputContainer}>
                            <label htmlFor="password">Enter Password</label>
                            <input 
                                className="input" 
                                type="password" 
                                placeholder="Enter your password" 
                                onChange={submit} 
                                name="password" 
                                required 
                                style={styles.input}
                            />
                        </div>
                        <button className="btn" type="submit" style={styles.button}>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

const styles = {
    header: {
        textAlign: 'center',
        fontSize: '3.5rem',
        fontWeight: '700',
        color: '#fff',
        backgroundColor: '#4CAF50',
        padding: '40px 0',
        margin: 0,
        
        textTransform: 'uppercase',
    },
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

        left:"30%",
    
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
    loginCard: {
        backgroundColor: '#fff',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        width: '100%',
        position:'absolute',
        left:'30%',
        marginTop:'10px',
        maxWidth: '400px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    formTitle: {
        marginBottom: '20px',
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#333',
    },
    inputContainer: {
        marginBottom: '20px',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '14px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        outline: 'none',
        marginTop: '8px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    button: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background-color 0.3s, transform 0.3s ease',
    },
    errorMessage: {
        color: '#ff4d4d',
        fontSize: '16px',
        marginBottom: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
};

export default Create;