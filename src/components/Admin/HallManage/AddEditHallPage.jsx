import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddEditHallPage.module.css';
import { PATHS } from '../../../utils/constants';
import * as hallService from '../../../services/hallService';
import BackButton from '../../BackButton/BackButton';
import Spinner from '../../Spinner/Spinner';
import HallEditor from './HallEditor';

export default function AddEditHallPage() {
    const [hallName, setHallName] = useState('');
    const [rows, setRows] = useState([]);
    const { hallId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (hallId) {
            setIsLoading(true);
            hallService.getOne(hallId).then(response => {
                setHallName(response.hall.name);
                setRows(response.rows);
            });
            setIsLoading(false);
        }
    }, [hallId]);

    const handleNameChange = (e) => {
        setHallName(e.target.value);
    };

    const handleRowsChange = (updatedRows) => {
        setRows(updatedRows);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hallData = { name: hallName, rows };
        setIsLoading(true);
        if (hallId) {
            await hallService.editHall(hallId, hallData);
        } else {
            await hallService.addHall(hallData);
        }
        setIsLoading(false);
        navigate(PATHS.MANAGE_HALLS);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <BackButton />
            <div className={styles.addEditHallContainer}>
                <h2>{hallId ? 'Edit Hall' : 'Add New Hall'}</h2>
                <form onSubmit={handleSubmit} className={styles.addEditHallForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={hallName}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <HallEditor
                        rows={rows}
                        onRowsChange={handleRowsChange}
                    />
                    <button type="submit" className="submit-button">
                        {hallId ? 'Update Hall' : 'Add Hall'}
                    </button>
                </form>
            </div>
        </>
    );
}