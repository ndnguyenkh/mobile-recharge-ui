
import axios from '~/config/Axios';

/**
 * get profile
 */
const PROFILE_API = () => {
    const url = "/api/Account";
    return axios.get(url);
}

const GET_NAME_API = () => {
    const url = "/api/Login/get-user-details";
    return axios.get(url);
}

export {
    PROFILE_API,
    GET_NAME_API
}