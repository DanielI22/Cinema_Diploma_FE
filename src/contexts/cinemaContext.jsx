import { createContext, useContext } from 'react';
import usePersistedState from '../hooks/usePersistedState';
import { CINEMA_HEADER } from '../utils/constants';

const CinemaContext = createContext();

export const useCinema = () => useContext(CinemaContext);

export const CinemaProvider = ({ children }) => {
    const [selectedCinema, setSelectedCinema] = usePersistedState(CINEMA_HEADER, null, 'localStorage');

    const setCinema = (cinema) => {
        setSelectedCinema(cinema);
    };

    const clearCinema = () => {
        setSelectedCinema(null);
    };

    return (
        <CinemaContext.Provider value={{ selectedCinema, setCinema, clearCinema }}>
            {children}
        </CinemaContext.Provider>
    );
};
