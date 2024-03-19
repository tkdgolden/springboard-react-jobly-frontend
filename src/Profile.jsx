import UserContext from './UserContext';
import React, { useContext, useState } from 'react';
import useGetUser from './hooks/useGetUser';
import EditProfileForm from './EditProfileForm';
import JobDetail from './JobDetail';

/**
 * displays the currently logged in user's information,
 * a form to edit their profile, 
 * and all jobs that user has applied to
 * @returns component
 */
const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [ userInfo, setUserInfo, getUserInfo, jobsArray ] = useGetUser(user);
    const [ editMode, setEditMode ] = useState(false);

    const toEdit = () => {
        setEditMode(!editMode);
    }

    if (editMode) {
        return (
            <EditProfileForm userInfo={userInfo} />
        );
    }
    
    return (
        <>
            <h2>{ userInfo.firstName } { userInfo.lastName }</h2>
            <p>{ userInfo.username }</p>
            <p>{ userInfo.email }</p>
            <button onClick={toEdit}>Edit</button>
            <h4>Job Applications:</h4>
            {jobsArray.map(job => <JobDetail key={job.id} jobInfo={job} />)}
        </>
    );
};

export default Profile