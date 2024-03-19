import JoblyApi from '../api.jsx';

/**
 * calls API function to apply for a job
 * @param {string} username 
 * @param {int} jobId 
 */
const useApplyJob = (username, jobId) => {
    JoblyApi.applyJob(username, jobId);
}

export default useApplyJob