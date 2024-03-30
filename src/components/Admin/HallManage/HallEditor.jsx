import React, { useState } from 'react';
import styles from './HallEditor.module.css';
import { INITIAL_SEATS, MAX_ROWS, MAX_SEATS } from '../../../utils/constants';

const HallEditor = ({ rows, onRowsChange }) => {
    const addRow = () => {
        if (rows.length >= MAX_ROWS) return;
        const newRow = {
            id: Math.random(),
            rowNumber: rows.length + 1,
            seats: Array.from({ length: INITIAL_SEATS }, (_, index) => ({ seatNumber: index + 1, isEmpty: false }))
        };
        onRowsChange([...rows, newRow]);
    };

    const addSeat = (rowIndex) => {
        const updatedRows = rows.map((row, index) => {
            if (index === rowIndex && row.seats.length < MAX_SEATS) {
                return {
                    ...row,
                    seats: [...row.seats, { id: Math.random(), seatNumber: row.seats.length + 1, isEmpty: false }]
                };
            }
            return row;
        });
        onRowsChange(updatedRows);
    };

    const toggleSeatEmpty = (rowIndex, seatIndex) => {
        const updatedRows = rows.map((row, rIndex) => {
            if (rIndex === rowIndex) {
                return {
                    ...row,
                    seats: row.seats.map((seat, sIndex) => {
                        if (sIndex === seatIndex) {
                            return { ...seat, isEmpty: !seat.isEmpty };
                        }
                        return seat;
                    })
                };
            }
            return row;
        });
        onRowsChange(updatedRows);
    };

    const deleteRow = (rowIndex) => {
        const updatedRows = rows.filter((_, index) => index !== rowIndex);
        const renumberedRows = updatedRows.map((row, index) => ({
            ...row,
            rowNumber: index + 1
        }));
        onRowsChange(renumberedRows);
    };

    return (
        <div className={styles.hallEditor}>
            <div className={styles.screenLabel}>Screen</div>
            <div className={styles.controls}>
                {rows.length < MAX_ROWS && (
                    <button type="button" className={styles.addRowBtn} onClick={addRow}>+ Add Row</button>
                )}
            </div>
            {rows.map((row, rowIndex) => (
                <div key={row.id} className={styles.row}>
                    <span className={styles.rowNumber}>{rowIndex + 1}</span>
                    {row.seats.map((seat, seatIndex) => (
                        <div key={seat.id} className={styles.seatWrapper}>
                            <div
                                className={`${styles.seat} ${seat.isEmpty ? styles.emptySeat : ''}`}
                                onClick={() => toggleSeatEmpty(rowIndex, seatIndex)}
                            >
                                {seat.isEmpty ? 'Empty' : seat.seatNumber}
                            </div>
                        </div>
                    ))}
                    {row.seats.length < MAX_SEATS && (
                        <button type="button" className={styles.addSeatBtn} onClick={() => addSeat(rowIndex)}>+</button>
                    )}
                    <button type="button" className={styles.deleteRowBtn} onClick={() => deleteRow(rowIndex)}>X</button>
                </div>
            ))}
        </div>
    );
};

export default HallEditor;
