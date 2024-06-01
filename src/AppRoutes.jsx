import { useAuth } from './contexts/authContext';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import OperatorLayout from './layouts/OperatorLayout';
import ValidatorLayout from './layouts/ValidatorLayout';
import ProjectorLayout from './layouts/ProjectorLayout';
import { ROLES } from './utils/constants';

const AppRoutes = () => {
    const { userDetails } = useAuth();
    if (userDetails.role == ROLES.USER) {
        return <UserLayout />;
    } else if (userDetails.role == ROLES.ADMIN) {
        return <AdminLayout />;
    } else if (userDetails.role == ROLES.OPERATOR) {
        return <OperatorLayout />;
    } else if (userDetails.role == ROLES.VALIDATOR) {
        return <ValidatorLayout />;
    } else if (userDetails.role == ROLES.PROJECTOR) {
        return <ProjectorLayout />;
    } else {
        return <UserLayout />;
    }
};

export default AppRoutes;