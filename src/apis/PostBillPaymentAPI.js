
import axios from '~/config/Axios';

/**
 * check bill
 * 
 * @param {*} id 
 * @returns 
 */
const CHECK_BILL_API = (id) => {
    const url = `/api/Invoice/${id}`;
    return axios.get(url);
}

/**
 * payment my account
 * 
 * @param {*} billNumber 
 * @returns 
 */
const PAYMENT_BILL_MYACCOUT_API = (billNumber) => {
    const url = "/api/PostBillPayment";
    const data = {
        guestIdentifier: "guest",
        billNumber,
        status: "success"
    }
    return axios.post(url, data);
}

/**
 * payment vnpay
 * 
 * @param {*} billNumber 
 * @returns 
 */
const PAYMENT_BILL_VNPAY_API = (billNumber) => {
    const url = "/api/PostBillPayment/CreateVNPay";
    const data = {
        guestIdentifier: "guest",
        billNumber,
        status: "success"
    }
    return axios.post(url, data);
}

/**
 * statistic
 */
const POST_BILL_PAYMENT_STATIC_API = () => {
    const url = "/api/PostBillPayment";
    return axios.get(url);
}

export {
    CHECK_BILL_API,
    PAYMENT_BILL_MYACCOUT_API,
    PAYMENT_BILL_VNPAY_API,
    POST_BILL_PAYMENT_STATIC_API
}