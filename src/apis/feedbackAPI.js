import axios from '~/config/Axios';

/**
 * Fetch all feedback
 * @returns {Promise}
 */
const FETCH_FEEDBACK_API = async () => {
    const url = "/api/Feedback";
    return axios.get(url);
};

/**
 * Fetch replies for a specific feedback
 * @returns {Promise}
 */
const FETCH_FEEDBACK_REPLIES_API = async () => {
    const url = '/api/ReFeedback/feedback-with-refeedback';
    return axios.get(url);
  };

/**
 * Submit feedback
 * @param {string} feedbackText
 * @returns {Promise}
 */
const SUBMIT_FEEDBACK_NO_LOGIN_API = async (feedbackText) => {
    const url = "/api/Feedback";
    const data = {
        feedbackText,
        status: "Pending"
    }
    return axios.post(url, data);
};


/**
 * Submit feedback
 * @param {string} feedbackText
 * @returns {Promise}
 */
const SUBMIT_FEEDBACK_LOGINED_API = async (feedbackText) => {
    const url = "/api/Feedback";
    const data = {
        feedbackText,
        status: "Pending"
    }
    return axios.post(url, data);
};


export {
    FETCH_FEEDBACK_API,
    FETCH_FEEDBACK_REPLIES_API,
    SUBMIT_FEEDBACK_NO_LOGIN_API,
    SUBMIT_FEEDBACK_LOGINED_API,
};
