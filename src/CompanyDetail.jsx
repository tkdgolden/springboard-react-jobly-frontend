import { useParams } from "react-router-dom";
import React, { useContext } from 'react';
import useGetSingleCompany from "./hooks/useGetSingleCompany";
import useGetLogo from "./hooks/useGetLogo";
import JobCard from "./JobCard";
import useGetUser from "./hooks/useGetUser";
import UserContext from './UserContext';

/**
 * displays detailed info on a company
 * @param {string} handle unique identifier for looking up company data
 * also displays all of a company's job postings
 * @returns component
 */
const CompanyDetail = () => {
    const { handle } = useParams();
    const [company, setCompany, getCompany, companyJobsArray] = useGetSingleCompany(handle);
    const { user, setUser } = useContext(UserContext);
    const [ userInfo, setUserInfo, getUserInfo, userJobsArray ] = useGetUser(user);

    if (company) {
        const currLogo = useGetLogo(company.logoUrl);

        return (
            <>
                <h4>{company.name}</h4>
                <p>Employees: {company.numEmployees}</p>
                <p>Description: {company.description}</p>
                {companyJobsArray.map(job => <JobCard key={job.id} jobInfo={job} userJobs={userInfo.applications} />)}
                <img src={currLogo} />
            </>
        );
    }
    return (
        <h3>Loading</h3>
    );

};

export default CompanyDetail