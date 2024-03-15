import { useContext, useEffect } from "react";
import * as authService from '../../services/authService';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { PATHS } from "../../utils/constants";

export default function Logout() {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
            .finally(() => {
                logoutHandler();
                navigate(PATHS.HOME);
            });
    }, [logoutHandler, navigate]);

    return null;
}