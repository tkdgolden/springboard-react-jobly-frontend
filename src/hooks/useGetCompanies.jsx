import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

/**
 * at the first page render, loads company data by API function
 * @returns company data, function to set company data, function for doing a search of company data
 */
const useGetCompanies = () => {
    const [data, setData] = useState([]);
    
    async function getAllCompanies() {
        const dataResult = await JoblyApi.getAllCompanies();
        setData(dataResult);
    }

    async function getFilteredCompanies(searchData) {
        const dataResult = await JoblyApi.searchCompanies(searchData);
        setData(dataResult);
    }

    useEffect(function fetchData() {
        getAllCompanies();
    }, []);

    return [data, setData, getFilteredCompanies]
}



export default useGetCompanies;