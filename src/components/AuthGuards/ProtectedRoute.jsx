import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import AuthContext from '../../contexts/authContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {

        return <Navigate to={PATHS.LOGIN} />;
    }

    return children;
}