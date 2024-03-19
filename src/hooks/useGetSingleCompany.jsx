import { useState, useEffect } from "react";
import JoblyApi from "../api";

/**
 * on first render gets detaild info on a single company from API function
 * @param {string} handle unique company identifier
 * @returns company data, function to set company data, function to get company data, array of jobs that company has posted
 */
const useGetSingleCompany = (handle) => {
    const [data, setData] = useState([]);
    const [jobsArray, setJobsArray] = useState([]);
    
    async function getData() {
        const dataResult = await JoblyApi.getCompany(handle);
        setData(dataResult);
        setJobsArray(dataResult.jobs);
    }

    useEffect(function fetchData() {
        getData();
    }, []);

    return [data, setData, getData, jobsArray];
}



export default useGetSingleCompany;