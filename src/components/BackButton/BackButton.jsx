import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './BackButton.module.css';

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <button onClick={goBack} className={`submit-button ${styles.backButton}`} >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
    );
};

export default BackButton;