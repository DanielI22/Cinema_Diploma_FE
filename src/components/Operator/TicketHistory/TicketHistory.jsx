import React, { useEffect, useState } from 'react';
import * as ticketService from "../../../services/ticketService";
import Spinner from '../../Spinner/Spinner';
import styles from './TicketHistory.module.css';
import OperatorSidebar from '../OperatorSidebar/OperatorSidebar';
import { useCinema } from '../../../contexts/cinemaContext';
import { formatLocalDate, mapTicketType } from '../../../utils/functions';
import { useTranslation } from 'react-i18next';

const TicketHistory = () => {
    const { selectedCinema } = useCinema();
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { t } = useTranslation();

    const fetchTickets = async (page) => {
        const result = await ticketService.getOperatorTickets(selectedCinema.id, page, 20);
        setTickets(result.tickets);
        setTotalPages(result.totalPages);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTickets(page);
    }, [page, selectedCinema.id]);

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className={styles.ticketHistoryPage}>
            <OperatorSidebar />
            <div className={styles.content}>
                <h2 className={styles.header}>{t('soldTicketsHistory')}</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{t('movieTitle')}</th>
                            <th>{t('showtime')}</th>
                            <th>{t('type')}</th>
                            <th>{t('price')}</th>
                            <th>{t('shortcode')}</th>
                            <th>{t('soldTime')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.movieTitle}</td>
                                <td>{formatLocalDate(ticket.showtimeStartTime)}</td>
                                <td>{mapTicketType(ticket.type)}</td>
                                <td>{ticket.price.toFixed(2)} BGN</td>
                                <td>{ticket.shortcode}</td>
                                <td>{formatLocalDate(ticket.soldTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    <button onClick={handlePreviousPage} disabled={page === 0}>{t('previous')}</button>
                    <span>{t('page')} {page + 1} {t('of')} {totalPages}</span>
                    <button onClick={handleNextPage} disabled={page >= totalPages - 1}>{t('next')}</button>
                </div>
            </div>
        </div>
    );
};

export default TicketHistory;
