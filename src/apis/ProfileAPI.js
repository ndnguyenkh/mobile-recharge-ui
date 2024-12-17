import axios from '~/config/Axios';

/**
 * Get Profile Details
 */
const PROFILE_API = async () => {
  const url = "/api/Account/get-user-and-account";
  return axios.get(url);
};

/**
 * Get User Name and Details
 */
const GET_NAME_API = () => {
    const url = "/api/Login/get-user-details"; 
    return axios.get(url).then(res => res.data);
};

/**
 * Get Caller Tunes
 */
const GET_CALLER_TUNES_API = () => {
    const url = "/api/Ringtone"; 
    return axios.get(url);
};

/**
 * Get Account Details
 */
const GET_ACCOUNT_API = (userId) => {
    const url = `/api/Account/${userId}`; 
    return axios.get(url).then(res => res.data);
};

/**
 * create account
 * 
 * @returns 
 */
const CREATE_ACCOUNT_API = () => {
  const url = "/api/Account";
  const data = {
    accountBalance: 1000000
  }
  return axios.post(url, data);
}

/**
 * update account user
 * 
 * @param {*} userName 
 * @param {*} email 
 * @param {*} phone 
 * @returns 
 */
const UPDATE_ACCOUNT_USER_API = (userName, email, phone) => {
  const url = "/api/Login/UpdateProfile";
  const data = {
    userName,
    email,
    phone
  }
  return axios.post(url, data);
}
  
/**
 * Update Account Ringtone API
 * @param {number} ringtoneId 
 * @returns {Promise} 
 */
const UPDATE_ACCOUNT_CALLER_TUNE_API = (ringtoneId) => {
  const url = "/api/AccountRingtone";
  const data = { ringtoneId };
  return axios.post(url, data);
};

export {
    PROFILE_API,
    GET_NAME_API,
    GET_CALLER_TUNES_API,
    GET_ACCOUNT_API,
    CREATE_ACCOUNT_API,
    UPDATE_ACCOUNT_USER_API,
    UPDATE_ACCOUNT_CALLER_TUNE_API
};
