
import axios from '~/config/Axios';

/**
 * vnpay Guest
 * 
 * @param {*} guestIdentifier 
 * @param {*} amount 
 * @param {*} phone 
 * @returns 
 */
const VNPAY_GUEST_API = (guestIdentifier, amount, phone) => {
    const url = "/api/OnlineRecharge/CreateVNPay";
    const data = {
        guestIdentifier,
        amount,
        status: "success",
        phone
    }
    return axios.post(url, data);
}

/**
 * vnpay Customer
 * 
 * @param {*} amount 
 * @param {*} phone 
 * @returns 
 */
const VNPAY_CUS_API = (amount, phone) => {
    const url = "/api/OnlineRecharge/CreateVNPay";
    const data = {
        amount,
        status: "success",
        phone
    }
    return axios.post(url, data);
}

/**
 * my accout customer 
 * 
 * @param {*} amount 
 * @param {*} phone 
 */
const MYACCOUT_API = (amount, phone) => {
    const url = "/api/OnlineRecharge";
    const data = {
        amount,
        status: "success",
        phone
    }
    return axios.post(url, data);
}

/**
 * statistic
 * 
 * @returns 
 */
const RECHARGE_PHONE_STATIC_API = () => {
    const url = "/api/OnlineRecharge";
    return axios.get(url);
}

/**
 * revenue
 * 
 * @returns 
 */
const REVENUE_RECHARGE_PHONE_API = () => {
    const url = "/api/OnlineRecharge/GetFullOnlineRechargeRevenueReport";
    return axios.get(url);
}

export {
    VNPAY_GUEST_API,
    VNPAY_CUS_API,
    MYACCOUT_API,
    RECHARGE_PHONE_STATIC_API,
    REVENUE_RECHARGE_PHONE_API
}