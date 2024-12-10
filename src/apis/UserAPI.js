
import axios from '~/config/Axios';

/**
 * login
 * 
 * @param {*} userName 
 * @param {*} password 
 * @returns 
 */
const LOGIN_API = async (email, password) => {
    const url = "/api/Login/login";
    const data = {
        email,
        password
    }
    return await axios.post(url, data);
}

/**
 * register
 * 
 * @param {*} userName 
 * @param {*} password 
 * @param {*} email 
 * @param {*} phone 
 * @returns 
 */
const REGISTER_API = async (userName, password, email, phone) => {
    const url = "/api/Login/register";
    const data = {
        userName,
        password,
        email,
        phone
    }
    return await axios.post(url, data);
}

const USER_REGISTER_STATIC_API = () => {
    const url = "/api/Login";
    return axios.get(url);
}

export {
    LOGIN_API,
    REGISTER_API,
    USER_REGISTER_STATIC_API
}