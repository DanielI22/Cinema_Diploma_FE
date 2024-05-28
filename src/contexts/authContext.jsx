import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import usePersistedState from "../hooks/usePersistedState";
import * as authService from '../services/authService';
import { AUTH_TOKEN_HEADER, PATHS, REFRESH_TOKEN_HEADER } from "../utils/constants";
import { getUserRole } from "../utils/functions";
import { useCinema } from "./cinemaContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = usePersistedState(AUTH_TOKEN_HEADER, null, 'localStorage');
    const [, setRefreshToken] = usePersistedState(REFRESH_TOKEN_HEADER, null, 'localStorage');
    const [userDetails, setUserDetails] = useState({});
    const { clearCinema } = useCinema();

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
            role: getUserRole(decoded.realm_access?.roles)
        });
    }, []);

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values);
        if (result) {
            setAuthToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            updateUserDetails(result.accessToken);
            const decoded = jwtDecode(result.accessToken);
            const role = getUserRole(decoded.realm_access?.roles);
            return role;
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
        await authService.logout(authToken);
        setAuthToken(null);
        setRefreshToken(null);
        clearCinema();
        localStorage.clear();
        navigate(PATHS.LOGIN);
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