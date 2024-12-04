/**
 * Format Date
 * 
 * @param {*} dateString 
 * @returns 
 */
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

/**
 * Format Currency (Vietnamese Dong)
 * 
 * @param {number} amount 
 * @returns {string}
 */
const formatCurrency = (amount) => {
    if (isNaN(amount)) return '';
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

/**
 * Get current day
 * 
 * @returns 
 */
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng 0-11
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export {
    formatDate,
    formatCurrency,
    getCurrentDate
};
