import { useState, useEffect } from "react";
import JoblyApi from "../api";

/**
 * on first render, gets user info from API function
 * @param {string} username 
 * @returns user data, function to set user data, function to get user data, 
 * an array of information on each of that user's applications
 */
const useGetUser = (username) => {
    const [data, setData] = useState([]);
    const [appsArray, setAppsArray] = useState([]);
    
    async function getData() {
        const dataResult = await JoblyApi.getUser(username);
        setData(dataResult);
        
        let tempArray = [];
        for (let job of dataResult.applications) {
            const jobData = await JoblyApi.getJob(job);
            tempArray.push(jobData);
        }
        setAppsArray(tempArray);
    }

    useEffect(function fetchData() {
        getData();
    }, []);

    return [data, setData, getData, appsArray];
}



export default useGetUser;