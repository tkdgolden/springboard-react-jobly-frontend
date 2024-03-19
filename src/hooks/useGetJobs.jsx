import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

/**
 * on first render, gets job data with API function
 * @returns job data, function to set job data, function for filtered search of jobs
 */
const useGetJobs = () => {
    const [data, setData] = useState([]);
    
    async function getAllJobs() {
        const dataResult = await JoblyApi.getAllJobs();
        setData(dataResult);
    }

    async function getFilteredJobs(searchData) {
        const dataResult = await JoblyApi.searchJobs(searchData);
        setData(dataResult);
    }

    useEffect(function fetchData() {
        getAllJobs();
    }, []);

    return [data, setData, getFilteredJobs]
}



export default useGetJobs;