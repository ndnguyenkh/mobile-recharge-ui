import axios from '~/config/Axios';

/**
 * Get Profile Details
 */

/**
 * Get User Name and Details
 */
const GET_NAME_API = () => {
    const url = "/api/Login/get-user-details"; // Fetch user name and basic details
    return axios.get(url).then(res => res.data);
};

/**
 * Get Caller Tunes
 */
const GET_CALLER_TUNES_API = () => {
    const url = "/api/Ringtone"; // Fetch available caller tunes
    return axios.get(url).then(res => res.data);
};

/**
 * Get Account Details
 */
const GET_ACCOUNT_API = (userId) => {
    const url = `/api/Account/${userId}`; // Fetch account-specific details
    return axios.get(url).then(res => res.data);
};

const PROFILE_API = async () => {
    const url = "/api/Users";
    return axios.get(url);
  };

  export const UPDATE_PROFILE_API = async (data) => {
    try {
      const response = await axios.put("/api/profile/update", data);
      return response.data; // Assume success property in response
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };
  
export {
    PROFILE_API,
    GET_NAME_API,
    GET_CALLER_TUNES_API,
    GET_ACCOUNT_API
};
