import React, { useState, useEffect } from 'react';
import styles from './MyTicketsPage.module.css';
import * as ticketService from '../../../services/ticketService';
import Spinner from '../../Spinner/Spinner';
import Barcode from 'react-barcode';
import { generateTicketPDF } from '../../../utils/pdfGenerator';
import UserSidebar from '../UserSidebar/UserSidebar';
import { formatLocalDate, mapTicketType } from '../../../utils/functions';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 2;

const MyTicketsPage = () => {
    const { t } = useTranslation();
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
                    <p><strong>{t('hall')}:</strong> {hallName}</p>
                    <p>
                        <strong>{t('showtime')}:</strong> {formatLocalDate(showtimeStartTime)}
                    </p>
                    <p><strong>{t('seat')}:</strong> {t('row')} {seat.rowNumber} {t('seat')} {seat.seatNumber}</p>
                    <p><strong>{t('type')}:</strong> {mapTicketType(type)}</p>
                    <p><strong>{t('price')}:</strong> {price.toFixed(2)}  {t('BGN')}</p>
                    <div className={styles.actionButtons}>
                        <button onClick={() => generateTicketPDF(ticket)} className={styles.downloadButton}>{t('downloadAsPDF')}</button>
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
                <h1 className={styles.header}>{t('myTickets')}</h1>
                <div className={styles.section}>
                    <h2>{t('upcoming')}</h2>
                    {upcomingTickets.length > 0 ? (
                        upcomingTickets.map(renderTicket)
                    ) : (
                        <p>{t('noUpcomingTickets')}</p>
                    )}
                </div>
                <div className={styles.section}>
                    <h2>{t('alreadyPassed')}</h2>
                    {currentTickets.length > 0 ? (
                        currentTickets.map(renderTicket)
                    ) : (
                        <p>{t('noAlreadyPassedTickets')}</p>
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
