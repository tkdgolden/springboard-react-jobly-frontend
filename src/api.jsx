import axios from "axios";
import { redirect } from "react-router-dom";

const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // can get token from local storage on page refresh without having to log back in
    if (!JoblyApi.token) {
      JoblyApi.token = localStorage.token;
    }

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**
   * get all companies and some info on each
   * returns [ { handle, name, description, numEmployees, logoUrl }, ...]
   */
  static async getAllCompanies() {
    let res = await this.request('companies');
    return res.companies;
  }

  /**
   * get companies that match the filter data
   * @param {object} data can include
   * - minEmployees
   * - maxEmployees
   * - nameLike (will find case-insensitive, partial matches)
   * returns [ { handle, name, description, numEmployees, logoUrl }, ...]
   */
  static async searchCompanies(data) {
    const usefulData = {};
    if (data.name) {
      usefulData["name"] = data.name;
    }
    if (data.minEmployees) {
      usefulData["minEmployees"] = data.minEmployees;
    }
    if (data.maxEmployees) {
      usefulData["maxEmployees"] = data.maxEmployees;
    }
    let res = await this.request('companies', usefulData)
    return res.companies;
  }

  /**
   * gets all jobs
   * @returns [ { id, title, salary, equity, companyHandle, companyName }, ...]
   */
  static async getAllJobs() {
    let res = await this.request('jobs');
    return res.jobs;
  }

  /**
   * get jobs that match the filter data
   * @param {object} data can include
   * - minSalary
   * - hasEquity (true returns only jobs with equity > 0, other values ignored)
   * - title (will find case-insensitive, partial matches)
   * returns [ { id, title, salary, equity, companyHandle, companyName }, ...]
   */
  static async searchJobs(data) {
    const usefulData = {};
    if (data.minSalary) {
      usefulData["minSalary"] = data.minSalary;
    }
    if (data.hasEquity === true) {
      usefulData["hasEquity"] = data.hasEquity;
    }
    if (data.title) {
      usefulData["title"] = data.title;
    }
    let res = await this.request('jobs', usefulData)
    return res.jobs;
  }

  /**
   * logs in a user by verifying username and password to get a token and store that in JoblyApi.token as well as on the localStorage
   * @param {object} data username and password
   * @returns true or false on success
   */
  static async login(data) {
    try {
      let res = await this.request('auth/token', data, "post");
      JoblyApi.token = res.token;
      localStorage.token = res.token;
      return true;
    }
    catch {
      return false;
    }
  }

  /**
   * registers a new user and saves the response token
   * @param {object} data { username, password, firstName, lastName, email }
   */
  static async register(data) {
    try {
      let res = await this.request('auth/register', data, "post");
      JoblyApi.token = res.token;
      localStorage.token = res.token;
      return res;
    }
    catch (e) {
      return redirect("/login");
    }
  }

  /**
   * gets a user info
   * @param {string} username 
   * @returns user info: { username, firstName, lastName, isAdmin, applications }
   */
  static async getUser(username) {
    try {
      let res = await this.request(`users/${username}`);
      return res.user;
    }
    catch {
      return redirect("/");
    }
  }

  /**
   * edits a user info
   * @param {object} data { firstName, lastName, password, email }
   * @returns true on success
   */
  static async editUser(data) {
    const usefulData = {};
    if (data.firstName) {
      usefulData["firstName"] = data.firstName;
    }
    if (data.lastName) {
      usefulData["lastName"] = data.lastName;
    }
    if (data.password) {
      usefulData["password"] = data.password;
    }
    if (data.email) {
      usefulData["email"] = data.email;
    }
    await this.request(`users/${data.username}`, usefulData, "patch")
    return true;
  }

  /**
   * applies a given user for a given job
   * @param {string} username 
   * @param {int} jobId 
   */
  static async applyJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }

  /**
   * gets a singular job by id
   * @param {int} jobId 
   * @returns job info { id, title, salary, equity, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   */
  static async getJob(jobId) {
    let res = await this.request(`jobs/${jobId}`);
    return res.job;
  }

}

export default JoblyApi;