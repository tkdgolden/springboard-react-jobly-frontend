import React, { useState, useContext } from 'react';
import JoblyApi from './api';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

/**
 * controlled form for new user registration
 * registers on submit
 * @returns component
 */
const LoginForm = () => {
    const INITIAL_STATE = {username: "", password: "", firstName: "", lastName: "", email: ""};
    const [fData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = async evt => {
        evt.preventDefault();

        if (username && password && firstName && lastName && email) {
            const success = await JoblyApi.register(fData);
            if (success) {
                setUser(fData.username);
                navigate("/");
            }
            else {
                setFormData(INITIAL_STATE);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
                id="username"
                type="text"
                value={fData.username}
                onChange={handleChange}
                name="username"
            />
            <label htmlFor="password">Password: </label>
            <input
                id="password"
                type="text"
                value={fData.password}
                onChange={handleChange}
                name="password"
            />
            <label htmlFor="firstName">First Name: </label>
            <input
                id="firstName"
                type="text"
                value={fData.firstName}
                onChange={handleChange}
                name="firstName"
            />
            <label htmlFor="lastName">Last Name: </label>
            <input
                id="lastName"
                type="text"
                value={fData.lastName}
                onChange={handleChange}
                name="lastName"
            />
            <label htmlFor="email">Email: </label>
            <input
                id="email"
                type="email"
                value={fData.email}
                onChange={handleChange}
                name="email"
            />
            <button>Log In</button>
        </form>
    );
};

export default LoginForm