import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import usePersistedState from "../hooks/usePersistedState";
import * as authService from '../services/authService';
import { AUTH_TOKEN_HEADER, PATHS, REFRESH_TOKEN_HEADER } from "../utils/constants";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = usePersistedState(AUTH_TOKEN_HEADER, null, 'sessionStorage');
    const [refreshToken, setRefreshToken] = usePersistedState(REFRESH_TOKEN_HEADER, null, 'localStorage');
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        if (authToken) {
            updateUserDetails(authToken);
        } else {
            setUserDetails({});
        }
    }, [authToken]);

    const updateUserDetails = useCallback((token) => {
        const decoded = jwtDecode(token);
        setUserDetails({
            userId: decoded.sub,
            username: decoded.preferred_username,
            email: decoded.email,
            roles: decoded.realm_access?.roles || []
        });
    }, []);

    const refreshTokens = async () => {
            const result = await authService.refreshToken(refreshToken);
            setAuthToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            navigate(PATHS.LOGIN);
    };

    useEffect(() => {
        const interval = authToken ? setInterval(() => {
            const decoded = jwtDecode(authToken);
            const currentTime = Date.now() / 1000;
            if (decoded.exp - currentTime < 60 * 2) { // Less than 2 minutes
                refreshTokens();
            }
        }, 1000 * 60 * 4) : null; // Check every 4 minutes

        return () => interval && clearInterval(interval);
    }, [authToken, refreshToken, refreshTokens]);

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values);
        if (result) {
            setAuthToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            navigate(-1);
        }
    };

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values);
        if (result) {
            setAuthToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            navigate(PATHS.HOME);
        }
    };

    const logoutHandler = async () => {
        await authService.logout();
        setAuthToken(null);
        setRefreshToken(null);
        sessionStorage.removeItem(AUTH_TOKEN_HEADER);
        localStorage.removeItem(REFRESH_TOKEN_HEADER);
        navigate(PATHS.HOME);
    };

    const isAuthenticated = !!authToken;
    const authContextValue = { loginSubmitHandler, registerSubmitHandler, logoutHandler, userDetails, isAuthenticated };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);