// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setAuthenticatedUser = (user) => {
        setUser(user);
    };

    return (
        <AuthContext.Provider value={{ user, setAuthenticatedUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
