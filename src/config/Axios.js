import axiosClient from "axios";

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const instance = axiosClient.create({
    // baseURL: 'http://localhost:8081'
    baseURL: 'http://localhost:5117'
    // as string,
    // withCredentials: true
});

// request
instance.interceptors.request.use(function (config) {
    // if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
    //     config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    // }
    // if (!config.headers.Accept && config.headers["Content-Type"]) {
    //     config.headers.Accept = "application/json";
    //     config.headers["Content-Type"] = "application/json; charset=utf-8";
    // }
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {

    return Promise.reject(error);
});

// response
instance.interceptors.response.use(function (response) {
    

    if (response && response.data) return response.data;
    return response;
}, function (error) {

    if (error?.response?.data) return error?.response?.data;
    return Promise.reject(error);
});

export default instance;