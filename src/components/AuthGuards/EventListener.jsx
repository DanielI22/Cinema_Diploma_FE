import { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';

const EventListener = () => {
    const { logoutHandler } = useAuth();
    useEffect(() => {
        const handleSessionExpired = () => {
            logoutHandler();
        };

        window.addEventListener('sessionExpired', handleSessionExpired);

        return () => {
            window.removeEventListener('sessionExpired', handleSessionExpired);
        };
    }, [logoutHandler]);

    return null;
};

export default EventListener;
