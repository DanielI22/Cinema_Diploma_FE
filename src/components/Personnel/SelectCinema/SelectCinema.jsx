import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCinema } from '../../../contexts/cinemaContext';
import { PATHS, ROLES } from '../../../utils/constants';
import * as cinemaService from "../../../services/cinemaService";
import styles from './SelectCinema.module.css';
import Spinner from '../../Spinner/Spinner';
import OperatorSidebar from '../../Operator/OperatorSidebar/OperatorSidebar';
import { useAuth } from '../../../contexts/authContext';
import { useTranslation } from 'react-i18next';

const SelectCinema = () => {
    const [cinemas, setCinemas] = useState([]);
    const { selectedCinema, setCinema } = useCinema();
    const { userDetails } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchCinemas = async () => {
            setIsLoading(true);
            const data = await cinemaService.getAll();
            setCinemas(data.cinemas);
            setIsLoading(false);
        };
        fetchCinemas();
    }, []);

    const handleCinemaSelect = (cinema) => {
        setCinema(cinema);
        navigate(PATHS.HOME);
    };

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className={styles.container}>
            {userDetails.role === ROLES.OPERATOR && selectedCinema && <OperatorSidebar />}
            <div className={styles.mainContent}>
                <h1 className={styles.title}>{t('selectCinema')}</h1>
                {cinemas.map(cinema => (
                    <button key={cinema.id} onClick={() => handleCinemaSelect(cinema)} className={styles.cinemaButton}>
                        {cinema.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SelectCinema;
