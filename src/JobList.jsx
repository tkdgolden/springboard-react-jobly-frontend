import UserContext from './UserContext';
import React, { useContext } from 'react';
import { v4 as uuid } from "uuid";
import useGetJobs from "./hooks/useGetJobs";
import JobSearchForm from "./JobSearchForm";
import JobCard from "./JobCard";
import useGetUser from "./hooks/useGetUser";

/**
 * displays list of all jobs, or jobs that match the current search
 * and a form to filter/ search for jobs
 * @returns component
 */
const JobList = () => {
    const { user, setUser } = useContext(UserContext);
    const [jobs, setJobs, searchJobs] = useGetJobs();
    const [ userInfo, setUserInfo, getUserInfo, jobsArray ] = useGetUser(user);

    if (jobs.length !== 0) {
        return (
            <>
                <h2>Jobs</h2>
                <JobSearchForm searchJobs={searchJobs} />
                {jobs.map(job => <JobCard jobInfo={job} userJobs={userInfo.applications} key={uuid()} />)}
            </>
        );
    }
    return (
        <>
            <h4>Loading</h4>
            <h2>Jobs</h2>
        </>
    );
};

export default JobList