import React, { useState, useEffect } from 'react';
import styles from './MyTicketsPage.module.css';
import * as ticketService from '../../../services/ticketService';
import Spinner from '../../Spinner/Spinner';
import Barcode from 'react-barcode';
import { generateTicketPDF } from '../../../utils/pdfGenerator';
import UserSidebar from '../UserSidebar/UserSidebar';

const ITEMS_PER_PAGE = 2;

const MyTicketsPage = () => {
    const [upcomingTickets, setUpcomingTickets] = useState([]);
    const [passedTickets, setPassedTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchTickets = async () => {
        const response = await ticketService.getMyTickets();
        const now = new Date();

        const upcoming = response.tickets.filter(ticket => new Date(ticket.showtimeStartTime) > now);
        const passed = response.tickets.filter(ticket => new Date(ticket.showtimeStartTime) <= now);

        setUpcomingTickets(upcoming);
        setPassedTickets(passed);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const indexOfLastTicket = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstTicket = indexOfLastTicket - ITEMS_PER_PAGE;
    const currentTickets = passedTickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return <Spinner />;
    }

    const renderTicket = (ticket) => {
        const { movieTitle, moviePoster, cinemaName, hallName, showtimeStartTime, seat, type, price, shortcode } = ticket;
        return (
            <div key={ticket.id} className={styles.ticketCard}>
                <img src={moviePoster} alt={movieTitle} className={styles.moviePoster} />
                <div className={styles.ticketDetails}>
                    <h3 className={styles.movieTitle}>{movieTitle}</h3>
                    <p><strong>{cinemaName}</strong></p>
                    <p><strong>Hall:</strong> {hallName}</p>
                    <p>
                        <strong>Showtime:</strong> {new Date(showtimeStartTime).toLocaleString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}
                    </p>
                    <p><strong>Seat:</strong> Row {seat.rowNumber} Seat {seat.seatNumber}</p>
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>Price:</strong> {price} BGN</p>
                    <div className={styles.actionButtons}>
                        <button onClick={() => generateTicketPDF(ticket)} className={styles.downloadButton}>Download as PDF</button>
                    </div>
                </div>
                <div className={styles.barcodeContainer}>
                    <Barcode value={shortcode} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.myTicketsPage}>
            <UserSidebar />
            <div className={styles.content}>
                <h1 className={styles.header}>My Tickets</h1>
                <div className={styles.section}>
                    <h2>Upcoming</h2>
                    {upcomingTickets.length > 0 ? (
                        upcomingTickets.map(renderTicket)
                    ) : (
                        <p>No upcoming tickets.</p>
                    )}
                </div>
                <div className={styles.section}>
                    <h2>Already Passed</h2>
                    {currentTickets.length > 0 ? (
                        currentTickets.map(renderTicket)
                    ) : (
                        <p>No already passed tickets.</p>
                    )}
                    <div className={styles.pagination}>
                        {Array.from({ length: Math.ceil(passedTickets.length / ITEMS_PER_PAGE) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePageButton : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTicketsPage;
