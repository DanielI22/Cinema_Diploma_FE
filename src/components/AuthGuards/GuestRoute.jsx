import { Navigate } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useAuth } from '../../contexts/authContext';

export default function GuestRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {

        return <Navigate to={PATHS.HOME} />;
    }

    return children;
}