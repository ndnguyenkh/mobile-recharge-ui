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

function searchByDate(data, inputDate) {
    // Kiểm tra và chuẩn hóa inputDate (chuyển thành yyyy-mm-dd)
    const regex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/](19|20)\d\d$/;
    
    if (!regex.test(inputDate)) {
        console.error("Ngày nhập vào không đúng định dạng.");
        return [];
    }

    // Chuyển ngày nhập vào từ dd/mm/yyyy hoặc dd-mm-yyyy thành yyyy-mm-dd
    const [day, month, year] = inputDate.split(/[-/]/).map(num => num.padStart(2, '0')); // Đảm bảo rằng ngày và tháng luôn có 2 chữ số
    const formattedDate = `${year}-${month}-${day}`; // Định dạng thành yyyy-mm-dd

    // Lọc các bản ghi trong data có ngày trùng với formattedDate
    const result = data.filter(item => {
        const itemDate = item.rechargeDate.split('T')[0]; // Lấy ngày (yyyy-mm-dd) từ `rechargeDate`
        return itemDate === formattedDate;
    });

    return result;
}

function searchByDate2(data, inputDate) {
    // Kiểm tra và chuẩn hóa inputDate (chuyển thành yyyy-mm-dd)
    const regex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/](19|20)\d\d$/;
    
    if (!regex.test(inputDate)) {
        console.error("Ngày nhập vào không đúng định dạng.");
        return [];
    }

    // Chuyển ngày nhập vào từ dd/mm/yyyy hoặc dd-mm-yyyy thành yyyy-mm-dd
    const [day, month, year] = inputDate.split(/[-/]/).map(num => num.padStart(2, '0')); // Đảm bảo rằng ngày và tháng luôn có 2 chữ số
    const formattedDate = `${year}-${month}-${day}`; // Định dạng thành yyyy-mm-dd

    // Lọc các bản ghi trong data có ngày trùng với formattedDate
    const result = data.filter(item => {
        const itemDate = item.paymentDate.split('T')[0]; // Lấy ngày (yyyy-mm-dd) từ `rechargeDate`
        return itemDate === formattedDate;
    });

    return result;
}

function searchByDate3(data, inputDate) {
    // Kiểm tra và chuẩn hóa inputDate (chuyển thành yyyy-mm-dd)
    const regex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/](19|20)\d\d$/;
    
    if (!regex.test(inputDate)) {
        console.error("Ngày nhập vào không đúng định dạng.");
        return [];
    }

    // Chuyển ngày nhập vào từ dd/mm/yyyy hoặc dd-mm-yyyy thành yyyy-mm-dd
    const [day, month, year] = inputDate.split(/[-/]/).map(num => num.padStart(2, '0')); // Đảm bảo rằng ngày và tháng luôn có 2 chữ số
    const formattedDate = `${year}-${month}-${day}`; // Định dạng thành yyyy-mm-dd

    // Lọc các bản ghi trong data có ngày trùng với formattedDate
    const result = data.filter(item => {
        const itemDate = item.createdAt.split('T')[0]; // Lấy ngày (yyyy-mm-dd) từ `rechargeDate`
        return itemDate === formattedDate;
    });

    return result;
}

export {
    formatDate,
    formatCurrency,
    getCurrentDate,
    searchByDate,
    searchByDate2,
    searchByDate3
};
