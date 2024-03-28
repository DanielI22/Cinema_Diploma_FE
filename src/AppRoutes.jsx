import { useAuth } from './contexts/authContext';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import OperatorLayout from './layouts/OperatorLayout';
import ValidatorLayout from './layouts/ValidatorLayout';
import ProjectorLayout from './layouts/ProjectorLayout';

const AppRoutes = () => {
    const { userDetails } = useAuth();
    if (userDetails.role == 'user') {
        return <UserLayout />;
    } else if (userDetails.role == 'admin') {
        return <AdminLayout />;
    } else if (userDetails.role == 'operator') {
        return <OperatorLayout />;
    } else if (userDetails.role == 'validator') {
        return <ValidatorLayout />;
    } else if (userDetails.role == 'projector') {
        return <ProjectorLayout />;
    } else {
        return <UserLayout />;
    }
};

export default AppRoutes;