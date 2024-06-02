// DateNavigation.js
import React from 'react';
import styles from './DateNavigation.module.css'; // Ensure you have this CSS file

function DateNavigation({ selectedDate, onSelectDate }) {
    const renderDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates.map((date) => (
            <button
                key={date.toISOString()}
                className={selectedDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10) ? styles.selectedDate : styles.dateButton}
                onClick={() => onSelectDate(date)}
            >
                {date.toLocaleDateString('bg', {
                    weekday: 'short',
                    month: '2-digit',
                    day: '2-digit'
                })}
            </button>
        ));
    };

    return (
        <div className={styles.dateNavigation}>
            {renderDates()}
        </div>
    );
}

export default DateNavigation;
