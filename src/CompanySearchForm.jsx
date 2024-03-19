import React, { useState } from "react";

/**
 * controlled form for filtering/ searching companies
 * searches on submit
 * @param {function} searchCompanies alters state in parent and causes a rerender of companies list with the search results
 * @returns component
 */
const CompanySearchForm = ({ searchCompanies }) => {
    const INITIAL_STATE = {name: "", minEmployees: "", maxEmployees: ""};
    const [fData, setFormData] = useState(INITIAL_STATE);
    
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        searchCompanies(fData);
        setFormData(INITIAL_STATE);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Company Name: </label>
            <input
                id="name"
                type="text"
                value={fData.name}
                onChange={handleChange}
                name="name"
            />
            <label htmlFor="minEmployees">Minimum Employees: </label>
            <input
                id="minEmployees"
                type="number"
                value={fData.minEmployees}
                onChange={handleChange}
                name="minEmployees"
            />
            <label htmlFor="maxEmployees">Maximum Employees: </label>
            <input
                id="maxEmployees"
                type="number"
                value={fData.maxEmployees}
                onChange={handleChange}
                name="maxEmployees"
            />
            <button>Search</button>
        </form>
    );
};

export default CompanySearchForm