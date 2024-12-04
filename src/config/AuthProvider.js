import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // const [auth, setAuth] = useState(null);
    const [auth, setAuth] = useState(() => {
        // Khôi phục trạng thái xác thực từ localStorage nếu có
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    const login = (token) => {
        setAuth({ token });
        localStorage.setItem('token', token); // Lưu token vào localStorage
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('token'); // Xóa token khỏi localStorage
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
