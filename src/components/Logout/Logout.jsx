import { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import Spinner from "../Spinner/Spinner";

export default function Logout() {
    const { logoutHandler } = useAuth();

    useEffect(() => {
        logoutHandler();
    }, [logoutHandler])

    return (<Spinner />)
}