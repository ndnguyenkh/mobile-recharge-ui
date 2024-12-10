
/**
 * check phone
 * 
 * @param {*} phoneNumber 
 * @returns bool
 */
const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    if (phonePattern.test(phoneNumber)) {
        return true;
    } else {
        return false;
    }
};

/**
 * check a data
 * 
 * @param {*} dateString 
 * @returns 
 */
const validateDate = (dateString) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/](19|20)\d\d$/;

    // Kiểm tra xem chuỗi có khớp với biểu thức chính quy không
    if (!regex.test(dateString)) {
        return false;
    }

    // Tách ngày, tháng, năm từ chuỗi
    const [day, month, year] = dateString.split(/[-/]/).map(num => parseInt(num, 10));

    // Kiểm tra ngày hợp lệ trong tháng
    const date = new Date(year, month - 1, day); // Lưu ý: tháng trong JavaScript tính từ 0 (0 là tháng 1)
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}

export {
    validatePhoneNumber,
    validateDate
}