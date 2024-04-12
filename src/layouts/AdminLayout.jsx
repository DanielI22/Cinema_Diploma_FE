import { Route, Routes } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import ProtectedRoute from '../components/AuthGuards/ProtectedRoute';
import Logout from '../components/Logout/Logout';
import NotFound from '../components/NotFound/NotFound';
import AdminHome from '../components/Admin/AdminHome/AdminHome';
import CinemaManagementPage from '../components/Admin/CinemaManage/CinemaManagementPage';
import AddEditCinemaPage from '../components/Admin/CinemaManage/AddEditCinemaPage';
import HallManagementPage from '../components/Admin/HallManage/HallManagementPage';
import AddEditHallPage from '../components/Admin/HallManage/AddEditHallPage';
import MovieManagementPage from '../components/Admin/MovieManage/MovieManagementPage';
import MovieDetails from '../components/User/MovieDetails/MovieDetails';
import AddEditMoviePage from '../components/Admin/MovieManage/AddEditMoviePage';
import AddSearchMovieApiPage from '../components/Admin/MovieManage/AddSearchMovieApiPage';
import GenreManagementPage from '../components/Admin/GenreManage/GenreManagementPage';
import BookingManagementPage from '../components/Admin/BookingManage/BookingManagementPage';
import ShowtimeManagementPage from '../components/Admin/ShowtimeManage/ShowtimeManagementPage';
import AddShowtimePage from '../components/Admin/ShowtimeManage/AddShowtimePage';

const AdminLayout = () => (
  <>
    <Routes>
      <Route path={PATHS.HOME} element={<AdminHome />} />
      <Route path={`${PATHS.MOVIES}/:movieId`} element={<MovieDetails />} />
      <Route path={PATHS.MANAGE_CINEMAS} element={<CinemaManagementPage />} />
      <Route path={PATHS.MANAGE_CINEMA} element={<AddEditCinemaPage />} />
      <Route path={`${PATHS.MANAGE_CINEMA}/:cinemaId`} element={<AddEditCinemaPage />} />
      <Route path={PATHS.MANAGE_HALLS} element={<HallManagementPage />} />
      <Route path={PATHS.MANAGE_HALL} element={<AddEditHallPage />} />
      <Route path={`${PATHS.MANAGE_HALL}/:hallId`} element={<AddEditHallPage />} />
      <Route path={PATHS.MANAGE_MOVIES} element={<MovieManagementPage />} />
      <Route path={PATHS.MANAGE_MOVIE} element={<AddEditMoviePage />} />
      <Route path={`${PATHS.MANAGE_MOVIE}/:movieId`} element={<AddEditMoviePage />} />
      <Route path={PATHS.MANAGE_MOVIE_API} element={<AddSearchMovieApiPage />} />
      <Route path={PATHS.MANAGE_GENRES} element={<GenreManagementPage />} />
      <Route path={PATHS.MANAGE_SHOWTIMES} element={<ShowtimeManagementPage />} />
      <Route path={PATHS.MANAGE_SHOWTIME} element={<AddShowtimePage />} />
      <Route path={PATHS.MANAGE_BOOKINGS} element={<BookingManagementPage />} />
      <Route path={PATHS.LOGOUT} element={<ProtectedRoute><Logout /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default AdminLayout;