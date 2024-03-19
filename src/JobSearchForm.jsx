import React, { useState } from "react";

/**
 * controlled form for filtering/ searching jobs
 * searches on submit
 * @param {function} searchJobs alters state in parent and causes a rerender of jobs list with the search results
 * @returns component
 */
const JobSearchForm = ({ searchJobs }) => {
    const INITIAL_STATE = {minSalary: "", hasEquity: false, title: ""};
    const [fData, setFormData] = useState(INITIAL_STATE);
    
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleCheckboxChange = evt => {
        const { name, checked } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: checked
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        searchJobs(fData);
        setFormData(INITIAL_STATE);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="minSalary">Minimum Salary: </label>
            <input
                id="minSalary"
                type="number"
                value={fData.minSalary}
                onChange={handleChange}
                name="minSalary"
            />
            <label htmlFor="hasEquity">Has Equity: </label>
            <input
                id="hasEquity"
                type="checkbox"
                value={fData.hasEquity}
                onChange={handleCheckboxChange}
                name="hasEquity"
            />
            <label htmlFor="title">Title: </label>
            <input
                id="title"
                type="text"
                value={fData.title}
                onChange={handleChange}
                name="title"
            />
            <button>Search</button>
        </form>
    );
};

export default JobSearchForm