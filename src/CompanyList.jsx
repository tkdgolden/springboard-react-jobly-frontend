import React from "react";
import CompanyCard from "./CompanyCard";
import useGetCompanies from "./hooks/useGetCompanies";
import CompanySearchForm from "./CompanySearchForm";

/**
 * displays a list of all companies (or all that match a given search) and a search form to filter them
 * @returns component
 */
const CompanyList = () => {
    const [companies, setCompanies, searchCompanies] = useGetCompanies();

    if (companies.length !== 0) {
        return (
            <>
                <h2>Companies</h2>
                <CompanySearchForm searchCompanies={searchCompanies} />
                {companies.map(company => <CompanyCard companyInfo={company} key={company.handle} />)}
            </>
        );
    }
    return (
        <>
            <h4>Loading</h4>
            <h2>Companies</h2>
        </>
    );
};

export default CompanyList