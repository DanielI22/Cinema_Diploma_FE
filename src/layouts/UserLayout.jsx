import Header from "../components/Header/Header";
import { Routes, Route } from 'react-router-dom';
import { PATHS } from "../utils/constants";
import Home from "../components/Home/Home";
import NotFound from "../components/NotFound/NotFound"
import GuestRoute from "../components/AuthGuards/GuestRoute";
import ProtectedRoute from "../components/AuthGuards/ProtectedRoute";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Logout from "../components/Logout/Logout";

const UserLayout = () => (
    <>
      <Header />
      <Routes>
            <Route path={PATHS.HOME} element={<Home />} />
            {/* {<Route path={PATHS.MOVIES} element={<Movies />} />
            <Route path={`${PATHS.MOVIES}/:movieId`} element={<MovieDetails />} />
            <Route path={PATHS.RESERVATIONS} element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
            <Route path={PATHS.FAVOURITES} element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
            <Route path={`${PATHS.MOVIES}/:movieId${PATHS.BOOKING}`} element={<ProtectedRoute><Booking /></ProtectedRoute>} /> */}
            <Route path={PATHS.LOGIN} element={<GuestRoute><Login /></GuestRoute>} />
            <Route path={PATHS.REGISTER} element={<GuestRoute><Register /></GuestRoute>} />
            <Route path={PATHS.LOGOUT} element={<ProtectedRoute><Logout /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </>
  );
  
  export default UserLayout;