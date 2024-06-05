import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CinemaListPage.module.css';
import * as cinemaService from '../../../services/cinemaService';
import CinemaCard from '../../User/CinemaCard/CinemaCard';
import { PATHS } from '../../../utils/constants';
import Spinner from '../../Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const CinemaListPage = () => {
    const { t } = useTranslation();
    const [cinemas, setCinemas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCinemas();
    }, []);

    const fetchCinemas = async () => {
        setIsLoading(true);
        const response = await cinemaService.getAll();
        setCinemas(response.cinemas);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.cinemaListScreen}>
            <div className={styles.header}>
                <h2>{t('selectCinema')}</h2>
            </div>
            <div className={styles.cinemaList}>
                {cinemas.map(cinema => (
                    <div key={cinema.id}>
                        <Link to={`${PATHS.PROGRAM}/${cinema.id}`}>
                            <CinemaCard cinema={cinema} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CinemaListPage;
