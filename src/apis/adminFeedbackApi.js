import axios from '~/config/Axios';

/**
 * Fetch all feedback
 * @returns {Promise} - Array of feedback data
 */
const FETCH_ALL_FEEDBACK_API = async () => {
  const url = '/api/feedback';
  return await axios.get(url);
};

/**
 * Fetch all refeedback
 * @returns {Promise} - Array of refeedback data
 */
const FETCH_ALL_REFEEDBACK_API = async () => {
  const url = '/api/ReFeedback';
  return await axios.get(url);
};

/**
 * re feedback
 * 
 * @param {*} feedbackId 
 * @param {*} refeedbackText 
 * @returns 
 */
const SEND_REPLY_API = async (feedbackId, refeedbackText) => {
  const url = '/api/ReFeedback';
  const data = {
    feedbackId,
    refeedbackText,
    status: "Replied"
  };
  return await axios.post(url, data);
};

export { FETCH_ALL_FEEDBACK_API, FETCH_ALL_REFEEDBACK_API, SEND_REPLY_API };
