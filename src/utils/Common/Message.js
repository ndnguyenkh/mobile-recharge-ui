
// err
const ErrorCodes = {
    // Các mã lỗi liên quan đến xác thực người dùng
    USER_NOT_FOUND: {
      code: 1001,
      message: "User not found.",
    },
    INVALID_CREDENTIALS: {
      code: 1002,
      message: "Invalid username or password.",
    },
    UNAUTHORIZED_ACCESS: {
      code: 1003,
      message: "Unauthorized access. Please log in.",
    },
  
    // Các mã lỗi liên quan đến dữ liệu
    DATA_NOT_FOUND: {
      code: 2001,
      message: "Requested data not found.",
    },
    INVALID_DATA_FORMAT: {
      code: 2002,
      message: "The data format is invalid.",
    },
  
    // Các mã lỗi hệ thống
    SERVER_ERROR: {
      code: 5000,
      message: "Internal server error. Please try again later.",
    },
    SERVICE_UNAVAILABLE: {
      code: 5001,
      message: "Service is temporarily unavailable.",
    },
  
    // Mã lỗi khác
    BAD_REQUEST: {
      code: 4000,
      message: "Bad request. Please check the input data.",
    },
};

// true
const Success = {
    SUCCESS_CREATE: {
        code: 200,
        message: "has been initialized successfully"
    },
    SUCCESS_SEND: {
        code: 201,
        message: "has been sent successfully"
    }
};

const Hellos = {
    WELCOME: {
      code: 100,
      message: "Welcome to Recharge Online"
    }
};
  
export {
    ErrorCodes,
    Success,
    Hellos
};
  