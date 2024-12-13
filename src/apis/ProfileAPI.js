import axios from '~/config/Axios';

/**
 * Get Profile Details
 */
const PROFILE_API = () => {
    const url = "/api/Account"; // Fetch user profile details
    return axios.get(url).then(res => res.data);
};

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

export {
    PROFILE_API,
    GET_NAME_API,
    GET_CALLER_TUNES_API,
    GET_ACCOUNT_API
};
