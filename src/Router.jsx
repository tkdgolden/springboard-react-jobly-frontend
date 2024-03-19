import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import CompanyList from './CompanyList.jsx'
import CompanyDetail from './CompanyDetail.jsx'
import JobList from './JobList.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx'
import Profile from './Profile.jsx';
import UserContext from './UserContext';
import React, { useContext } from 'react';
import EditProfileForm from "./EditProfileForm.jsx";

/**
 * controls which route's are active based on whether the current user is logged in or not
 * redirects if an invalid route is attempted
 * @returns component
 */
const Router = () => {
    const { user, setUser } = useContext(UserContext);

    if (user !== "null" && user !== null) {
        return (
            <>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/companies" element={<CompanyList />}></Route>
                        <Route path="/companies/:handle" element={<CompanyDetail />}></Route>
                        <Route path="/jobs" element={<JobList />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/edit-profile" element={<EditProfileForm />}></Route>
                        <Route path="*" element={<Navigate to="/" />}></Route>
                    </Routes>
                </BrowserRouter>
            </>
        );
    }


    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<LoginForm />}></Route>
                    <Route path="/signup" element={<SignupForm />}></Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router