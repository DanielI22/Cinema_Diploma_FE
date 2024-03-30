import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import { PATHS } from '../utils/constants';
import ProtectedRoute from '../components/AuthGuards/ProtectedRoute';
import Logout from '../components/Logout/Logout';
import NotFound from '../components/NotFound/NotFound';
import AdminHome from '../components/Admin/AdminHome/AdminHome';
import CinemaManagementPage from '../components/Admin/CinemaManage/CinemaManagementPage';
import AddEditCinemaPage from '../components/Admin/CinemaManage/AddEditCinemaPage';
import HallManagementPage from '../components/Admin/HallManage/HallManagementPage';
import AddEditHallPage from '../components/Admin/HallManage/AddEditHallPage';

const AdminLayout = () => (
  <>
    <Routes>
      <Route path={PATHS.HOME} element={<AdminHome />} />
      <Route path={PATHS.MANAGE_CINEMAS} element={<CinemaManagementPage />} />
      <Route path={PATHS.MANAGE_CINEMA} element={<AddEditCinemaPage />} />
      <Route path={`${PATHS.MANAGE_CINEMA}/:cinemaId`} element={<AddEditCinemaPage />} />
      <Route path={PATHS.MANAGE_HALLS} element={<HallManagementPage />} />
      <Route path={PATHS.MANAGE_HALL} element={<AddEditHallPage />} />
      <Route path={`${PATHS.MANAGE_HALL}/:hallId`} element={<AddEditHallPage />} />
      <Route path={PATHS.LOGOUT} element={<ProtectedRoute><Logout /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AdminLayout;