import React, { useEffect, useState } from 'react';
import * as ticketService from "../../../services/ticketService";
import Spinner from '../../Spinner/Spinner';
import styles from './TicketHistory.module.css';
import OperatorSidebar from '../OperatorSidebar/OperatorSidebar';
import { useCinema } from '../../../contexts/cinemaContext';

const TicketHistory = () => {
    const {selectedCinema} = useCinema();
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTickets = async (page) => {
        console.log(selectedCinema.id);
        const result = await ticketService.getOperatorTickets(selectedCinema.id, page, 20);
        setTickets(result.tickets);
        setTotalPages(result.totalPages)
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
                <h2 className={styles.header}>Sold Tickets History</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Showtime</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Shortcode</th>
                            <th>Sold Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.movieTitle}</td>
                                <td>{new Date(ticket.showtimeStartTime).toLocaleString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</td>
                                <td>{ticket.type}</td>
                                <td>{ticket.price.toFixed(2)} BGN</td>
                                <td>{ticket.shortcode}</td>
                                <td>{new Date(ticket.soldTime).toLocaleString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
                    <span>Page {page + 1} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={page >= totalPages - 1}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default TicketHistory;
