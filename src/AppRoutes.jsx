import AuthContext from './contexts/authContext';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import OperatorLayout from './layouts/OperatorLayout';
import ValidatorLayout from './layouts/ValidatorLayout';
import ProjectorLayout from './layouts/ProjectorLayout';
import { useContext } from 'react';

const AppRoutes = () => {
    const { role } = useContext(AuthContext);

    switch (role) {
        case 'admin':
            return <AdminLayout />;
        case 'operator':
            return <OperatorLayout />;
        case 'validator':
            return <ValidatorLayout />;
        case 'projector':
            return <ProjectorLayout />;
        default:
            return <UserLayout />;
    }
};

export default AppRoutes;