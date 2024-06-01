import { Route, Routes } from 'react-router-dom';
import { PATHS } from '../utils/constants';
import Logout from '../components/Logout/Logout';
import NotFound from '../components/NotFound/NotFound';
import SelectCinema from '../components/Personnel/SelectCinema/SelectCinema';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import PersonnelRoute from '../components/AuthGuards/PersonnelRoute';
import TicketHistory from '../components/Operator/TicketHistory/TicketHistory';
import ValidatorHome from '../components/Validator/ValidatorHome/ValidatorHome';
import TicketValidation from '../components/Validator/TicketValidation/TicketValidation';
import CinemaProgram from '../components/User/Program/CinemaProgram';

const ValidatorLayout = () => (
    <>
        <Routes>
            <Route path={PATHS.HOME} element={<PersonnelRoute><ValidatorHome /></PersonnelRoute>} />
            <Route path={PATHS.SELECT_CINEMA} element={<SelectCinema />} />
            <Route path={`${PATHS.PROGRAM}/:cinemaId`} element={<PersonnelRoute><CinemaProgram /></PersonnelRoute>} />
            <Route path={`${PATHS.VALIDATE_TICKET}/:showtimeId`} element={<PersonnelRoute><TicketValidation /></PersonnelRoute>} />
            <Route path={PATHS.MY_PROFILE} element={<PersonnelRoute><ProfilePage /></PersonnelRoute>} />
            <Route path={PATHS.LOGOUT} element={<Logout />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
)
export default ValidatorLayout;