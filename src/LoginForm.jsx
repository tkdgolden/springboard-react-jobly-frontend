import React, { useContext, useState } from 'react';
import JoblyApi from './api';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

/**
 * controlled form for submitting username and password to log in
 * @returns component
 */
const LoginForm = () => {
    const INITIAL_STATE = {username: "", password: ""};
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

        const success = await JoblyApi.login(fData);
        if (success) {
            setUser(fData.username);
            localStorage.user = fData.username;
            navigate("/");
        }
        else {
            setFormData(INITIAL_STATE);
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
            <button>Log In</button>
        </form>
    );
};

export default LoginForm