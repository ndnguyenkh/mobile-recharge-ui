import axios from '~/config/Axios';

/**
 * Get User ID from API
 */
const GET_USER_ID_FROM_API = async () => {
  try {
    const response = await axios.get('/api/Account/get-user-and-account', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data.User.UserId;  
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;  
  }
};

/**
 * Add Money Game API
 * @param {number} accountBalance
 * @returns {Promise}
 */
const SPINNING_API = (accountBalance) => {
    const url = "/api/Account";
    const data = { accountBalance };
    return axios.post(url, data);
}

// Named exports only (no default export)
export {
    SPINNING_API,
    GET_USER_ID_FROM_API
};
