import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import AuthContext from '../../contexts/authContext';

export default function GuestRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {

        return <Navigate to={PATHS.HOME} />;
    }

    return children;
}