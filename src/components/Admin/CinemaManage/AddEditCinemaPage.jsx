import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddEditCinemaPage.module.css';
import { PATHS } from '../../../utils/constants';
import * as cinemaService from '../../../services/cinemaService';
import * as hallService from '../../../services/hallService';
import BackButton from '../../BackButton/BackButton';
import Spinner from '../../Spinner/Spinner';
import HallSelect from './HallSelect';
import { useTranslation } from 'react-i18next';

export default function AddEditCinemaPage() {
    const { t } = useTranslation();
    const [cinema, setCinema] = useState({
        name: '',
        location: '',
        imageUrl: '',
        halls: []
    });
    const { cinemaId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [availableHalls, setAvailableHalls] = useState([]);
    const [selectedHalls, setSelectedHalls] = useState([]);
    const allHalls = selectedHalls.concat(availableHalls);

    useEffect(() => {
        hallService.getAvailable().then(response => {
            setAvailableHalls(response.halls);
        });

        if (cinemaId) {
            cinemaService.getOne(cinemaId).then(response => {
                setCinema({
                    name: response.cinema.name,
                    location: response.cinema.location,
                    imageUrl: response.cinema.imageUrl,
                    halls: response.halls.map(hall => hall.id)
                });
                setSelectedHalls(response.halls);
            });
        }
    }, [cinemaId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCinema(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleHallChange = (selectedHalls) => {
        const selectedHallsIds = selectedHalls.map(hall => hall.id)
        setCinema(prev => ({
            ...prev,
            halls: selectedHallsIds
        }));
        
        setSelectedHalls(selectedHalls);
        
        const newAvailableHalls = allHalls.filter(hall => !selectedHallsIds.includes(hall.id));
        setAvailableHalls(newAvailableHalls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (cinemaId) {
            await cinemaService.editCinema(cinemaId, cinema);
        } else {
            await cinemaService.addCinema(cinema);
        }
        setIsLoading(false);
        navigate(PATHS.MANAGE_CINEMAS);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.addEditCinemaContainer}>
            <BackButton />
            <h2>{cinemaId ? t('editCinema') : t('addNewCinema')}</h2>
            <form onSubmit={handleSubmit} className={styles.addEditCinemaForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">{t('name')}:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={cinema.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="location">{t('location')}:</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={cinema.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="imageUrl">{t('imageUrl')}:</label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        value={cinema.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="halls">{t('halls')}:</label>
                    <HallSelect
                        availableHalls={availableHalls}
                        selectedHalls={selectedHalls}
                        handleHallChange={handleHallChange}
                    />
                </div>
                <button type="submit" className="submit-button">
                    {cinemaId ? t('updateCinema') : t('addCinema')}
                </button>
            </form>
        </div>
    );
}
