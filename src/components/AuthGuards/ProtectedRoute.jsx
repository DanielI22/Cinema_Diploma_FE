import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useAuth } from '../../contexts/authContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {

        return <Navigate to={PATHS.LOGIN} state={{ from: location }} />;
    }

    return children;
}