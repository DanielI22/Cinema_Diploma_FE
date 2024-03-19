import { useAuth } from './contexts/authContext';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import OperatorLayout from './layouts/OperatorLayout';
import ValidatorLayout from './layouts/ValidatorLayout';
import ProjectorLayout from './layouts/ProjectorLayout';

const AppRoutes = () => {
    const { userDetails } = useAuth();
    if (Object.keys(userDetails).length === 0) {
        return <UserLayout />;
    }
    if (userDetails.roles.includes('admin')) {
        return <AdminLayout />;
    } else if (userDetails.roles.includes('operator')) {
        return <OperatorLayout />;
    } else if (userDetails.roles.includes('validator')) {
        return <ValidatorLayout />;
    } else if (userDetails.roles.includes('projector')) {
        return <ProjectorLayout />;
    } else {
        return <UserLayout />;
    }
};

export default AppRoutes;