import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCinema } from '../../../contexts/cinemaContext';
import { PATHS } from '../../../utils/constants';
import * as cinemaService from "../../../services/cinemaService";
import styles from './SelectCinema.module.css';

const SelectCinema = () => {
    const [cinemas, setCinemas] = useState([]);
    const { selectedCinema, setCinema } = useCinema();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCinemas = async () => {
            const data = await cinemaService.getAll();
            setCinemas(data.cinemas);
        };
        fetchCinemas();
    }, []);

    const handleCinemaSelect = (cinema) => {
        setCinema(cinema);
        navigate(PATHS.HOME);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Select a Cinema</h1>
            {cinemas.map(cinema => (
                <button key={cinema.id} onClick={() => handleCinemaSelect(cinema)} className={styles.cinemaButton}>
                    {cinema.name}
                </button>
            ))}
        </div>
    );
};

export default SelectCinema;
