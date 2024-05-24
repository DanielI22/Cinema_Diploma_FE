import { Route, Routes } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import ProtectedRoute from '../components/AuthGuards/ProtectedRoute';
import Logout from '../components/Logout/Logout';
import Home from '../components/User/Home/Home';
import NotFound from '../components/NotFound/NotFound';
import SelectCinema from '../components/Personnel/SelectCinema/SelectCinema';
import ProfilePage from '../components/ProfilePage/ProfilePage';

const OperatorLayout = () => (
    <>
        <Routes>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.SELECT_CINEMA} element={<SelectCinema />} />

            <Route path={PATHS.MY_PROFILE} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            <Route path={PATHS.LOGOUT} element={<ProtectedRoute><Logout /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
)
export default OperatorLayout;