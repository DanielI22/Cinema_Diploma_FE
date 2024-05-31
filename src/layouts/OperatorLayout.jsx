import { Route, Routes } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import Logout from '../components/Logout/Logout';
import NotFound from '../components/NotFound/NotFound';
import SelectCinema from '../components/Personnel/SelectCinema/SelectCinema';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import PersonnelRoute from '../components/AuthGuards/PersonnelRoute';
import OperatorHome from '../components/Operator/OperatorHome/OperatorHome';
import CinemaProgram from '../components/User/Program/CinemaProgram';
import Booking from '../components/User/Booking/Booking';
import TicketHistory from '../components/Operator/TicketHistory/TicketHistory';
import BookingValidation from '../components/Operator/BookingValidation/BookingValidation';

const OperatorLayout = () => (
    <>
        <Routes>
            <Route path={PATHS.HOME} element={<PersonnelRoute><OperatorHome /></PersonnelRoute>} />
            <Route path={PATHS.SELECT_CINEMA} element={<SelectCinema />} />
            <Route path={`${PATHS.PROGRAM}/:cinemaId`} element={<PersonnelRoute><CinemaProgram /></PersonnelRoute>} />
            <Route path={`${PATHS.BOOKING}/:showtimeId`} element={<PersonnelRoute><Booking /></PersonnelRoute>} />
            <Route path={PATHS.VALIDATE_BOOKING} element={<PersonnelRoute><BookingValidation /></PersonnelRoute>} />
            <Route path={PATHS.MY_PROFILE} element={<PersonnelRoute><ProfilePage /></PersonnelRoute>} />
            <Route path={PATHS.TICKET_HISTORY} element={<PersonnelRoute><TicketHistory /></PersonnelRoute>} />
            <Route path={PATHS.LOGOUT} element={<Logout />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
)
export default OperatorLayout;