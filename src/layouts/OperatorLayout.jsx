import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import { PATHS } from '../utils/constants';
import ProtectedRoute from '../components/AuthGuards/ProtectedRoute';
import Logout from '../components/Logout/Logout';
import Home from '../components/User/Home/Home';
import NotFound from '../components/NotFound/NotFound';

const OperatorLayout = () => (
    <>
        <Header />
        <div>OPERATOR</div>
        <Routes>
            <Route path={PATHS.HOME} element={<Home />} />

            <Route path={PATHS.LOGOUT} element={<ProtectedRoute><Logout /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
)
export default OperatorLayout;