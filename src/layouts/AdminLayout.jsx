import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import { PATHS } from '../utils/constants';
import ProtectedRoute from '../components/AuthGuards/ProtectedRoute';
import Logout from '../components/Logout/Logout';
import NotFound from '../components/NotFound/NotFound';
import AdminHome from '../components/Admin/AdminHome/AdminHome';

const AdminLayout = () => (
  <>
    <Header />
    <Routes>
      <Route path={PATHS.HOME} element={<AdminHome />} />

      <Route path={PATHS.LOGOUT} element={<ProtectedRoute><Logout /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AdminLayout;