import { Route, Routes } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import ProtectedRoute from '../components/AuthGuards/ProtectedRoute';
import Logout from '../components/Logout/Logout';
import Home from '../components/User/Home/Home';
import NotFound from '../components/NotFound/NotFound';
import SelectCinema from '../components/Personnel/SelectCinema/SelectCinema';
import PersonnelRoute from '../components/AuthGuards/PersonnelRoute';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import ProjectorHome from '../components/Projector/ProjectorHome/ProjectorHome';

const ProjectorLayout = () => (
    <>
        <Routes>
            <Route path={PATHS.HOME} element={<PersonnelRoute><ProjectorHome /></PersonnelRoute>} />
            <Route path={PATHS.SELECT_CINEMA} element={<SelectCinema />} />
            <Route path={PATHS.MY_PROFILE} element={<PersonnelRoute><ProfilePage /></PersonnelRoute>} />
            <Route path={PATHS.LOGOUT} element={<Logout />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
)
export default ProjectorLayout;