import UserContext from './UserContext';
import React, { useContext } from 'react';

/**
 * welcomes guest or user
 * @returns component
 */
const Home = () => {
    const { user, setUser } = useContext(UserContext);

    if (user) {
        return (
            <>
                <h1>Welcome Back</h1>
            </>
        );
    }
    return (
        <>
            <h1>Welcome Guest, please log in or register to access.</h1>
        </>
    );
};

export default Home