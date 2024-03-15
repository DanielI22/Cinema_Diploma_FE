import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import usePersistedState from "../hooks/usePersistedState";
import * as authService from '../services/authService';
import { PATHS } from "../utils/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = usePersistedState('authToken', null, 'sessionStorage');
    const [refreshToken, setRefreshToken] = usePersistedState('refreshToken', null, 'localStorage');
    const [userDetails, setUserDetails] = useState(() => {
        if (authToken) {
            return jwtDecode(authToken);
        }
        return {};
    });

    const updateUserDetails = (token) => {
        const decoded = jwtDecode(token);
        setUserDetails(decoded);
    };

    const refreshTokens = async () => {
        try {
            const result = await authService.refreshToken(refreshToken);
            setAuthToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            updateUserDetails(result.accessToken);
        } catch (error) {
            toast.error(error.message || 'Failed to refresh token');
            navigate(PATHS.LOGIN);
        }
    };

    // Automatically attempt to refresh token before it expires
    useEffect(() => {
        if (!authToken) return;
        const checkTokenExpiry = () => {
            const currentTime = Date.now() / 1000; // Convert to seconds
            const decoded = jwtDecode(authToken);
            const timeLeft = decoded.exp - currentTime;

            if (timeLeft < 60 * 5) { // Less than 5 minutes remaining
                refreshTokens();
            }
        };

        let interval = setInterval(checkTokenExpiry, 1000 * 60 * 4); // Check every 4 minutes

        return () => clearInterval(interval); // Cleanup on unmount
    }, [authToken, refreshToken]);

    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.login(values.email, values.password);
            setAuthToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            updateUserDetails(result.accessToken);
            navigate(-1);
        } catch (error) {
            toast.error('Error');
        }
    };

    const registerSubmitHandler = async (values) => {
        try {
            const result = await authService.register(values);
            setAuthToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            updateUserDetails(result.accessToken);
            navigate(PATHS.HOME);
        } catch (error) {
            toast.error('Error');
        }
    };

    const logoutHandler = async () => {
        await authService.logout();
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('authToken');
        setUserDetails({});
        navigate(PATHS.LOGIN);
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        userDetails,
        isAuthenticated: !!authToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;