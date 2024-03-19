import React, { useState, useContext } from 'react';
import JoblyApi from './api';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

/**
 * controlled form to edit current user's profile
 * doesn't allow username change, doesn't show current password
 * @param {object} userInfo current user info, as form defaults
 * @returns component
 */
const EditProfileForm = ({ userInfo }) => {
    console.log(userInfo);
    const { user, setUser } = useContext(UserContext);
    const INITIAL_STATE = { username: userInfo.username, password: "", firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email };
    const [fData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = async evt => {
        evt.preventDefault();

        const success = await JoblyApi.editUser(fData);
        if (success) {
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
                name="username"
                disabled
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
            <button>Submit Changes</button>
        </form>
    );
};

export default EditProfileForm