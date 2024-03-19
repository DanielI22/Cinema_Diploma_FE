import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import { PATHS } from '../utils/constants';
import Home from '../components/Home/Home';
import ProtectedRoute from '../components/AuthGuards/ProtectedRoute';
import Logout from '../components/Logout/Logout';
import NotFound from '../components/NotFound/NotFound';

const AdminLayout = () => (
  <>
    <Header />
    <div>ADMIN</div>
    {/* Admin-specific navigation, sidebars, etc., can go here */}
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />

      <Route path={PATHS.LOGOUT} element={<ProtectedRoute><Logout /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AdminLayout;