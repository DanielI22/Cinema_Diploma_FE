import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useAuth } from '../../contexts/authContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {

        return <Navigate to={PATHS.LOGIN} />;
    }

    return children;
}