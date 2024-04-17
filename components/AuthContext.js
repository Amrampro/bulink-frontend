import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const setAuthenticatedUser = (id) => {
        setUserId(id);
    };

    return (
        <AuthContext.Provider value={{ userId, setAuthenticatedUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
