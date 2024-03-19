import { Link } from "react-router-dom";
import useApplyJob from "./hooks/useApplyJob";
import UserContext from './UserContext';
import React, { useContext } from 'react';

/**
 * displays detail on a given card with an option for the current user to apply if they haven't already
 * @param {object} jobInfo { id, title, salary, equity, companyHandle, companyName }
 * @param {array} userJobs jobs the user has already applied to
 * @returns component
 */
const JobCard = ({ jobInfo, userJobs }) => {
    const { user, setUser } = useContext(UserContext);

    if (jobInfo.salary === null) {
        jobInfo.salary = "unknown";
    }
    if (jobInfo.equity === null) {
        jobInfo.equity = "unknown";
    }

    const clickApply = () => {
        useApplyJob(user, jobInfo.id)
    }

    if (userJobs && userJobs.length > 0 && userJobs.includes(jobInfo.id)) {
        return (
            <>
                <div>
                    <h4>{jobInfo.title}</h4>
                    <Link to={`/companies/${jobInfo.companyHandle}`} >{jobInfo.companyName}</Link>
                    <p>Salary: {jobInfo.salary}</p>
                    <p>Equity: {jobInfo.equity}</p>
                    <button disabled >Apply</button>
                </div>
    
            </>
        );
    }

    return (
        <>
            <div>
                <h4>{jobInfo.title}</h4>
                <Link to={`/companies/${jobInfo.companyHandle}`} >{jobInfo.companyName}</Link>
                <p>Salary: {jobInfo.salary}</p>
                <p>Equity: {jobInfo.equity}</p>
                <button onClick={clickApply}>Apply</button>
            </div>

        </>
    );

};

export default JobCard