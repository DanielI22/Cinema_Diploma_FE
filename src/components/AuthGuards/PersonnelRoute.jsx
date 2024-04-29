import { Navigate } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useCinema } from '../../contexts/cinemaContext';

export default function PersonnelRoute({ children }) {
    const { selectedCinema } = useCinema();

    if (!selectedCinema) {
        return <Navigate to={PATHS.SELECT_CINEMA} />;
    }

    return children;
}