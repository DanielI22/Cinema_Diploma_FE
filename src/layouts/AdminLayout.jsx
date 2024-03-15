import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AdminLayout = () => (
  <>
  <div>ADMIN</div>
    {/* Admin-specific navigation, sidebars, etc., can go here */}
    <Routes>
      {/* <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      Define other admin-specific routes */}
    </Routes>
  </>
);

export default AdminLayout;