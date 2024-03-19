import { Link } from "react-router-dom";
import React from 'react';

/**
 * displays details of a job that the current user has already applied to with a link to the company and no apply button
 * @param {object} jobInfo { id, title, salary, equity, companyHandle, companyName } 
 * @returns component
 */
const JobDetail = ({ jobInfo }) => {
    console.log("jobdetail", jobInfo);

    if (jobInfo.salary === null) {
        jobInfo.salary = "unknown";
    }
    if (jobInfo.equity === null) {
        jobInfo.equity = "unknown";
    }

    return (
        <>
            <div>
                <h4>{jobInfo.title}</h4>
                <Link to={`/companies/${jobInfo.company.handle}`} >{jobInfo.company.name}</Link>
                <p>Salary: {jobInfo.salary}</p>
                <p>Equity: {jobInfo.equity}</p>
            </div>

        </>
    );

};

export default JobDetail