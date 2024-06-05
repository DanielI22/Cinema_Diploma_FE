import jsPDF from 'jspdf';
import "jspdf-barcode";
import i18n from '../locales/i18n';
import { formatLocalDate, mapTicketType } from './functions';
import setupFonts from '../assets/fonts/Roboto-Regular-normal';

export const generateBookingPDF = async (booking) => {
    setupFonts();
    const doc = new jsPDF();
    const { movieTitle, cinemaName, hallName, showtimeStartTime, tickets, shortcode, totalPrice } = booking;

    doc.setFont('Roboto-Regular');
    doc.setFontSize(20);
    doc.text(i18n.t('bookingDetails'), 10, 10);
    doc.setFontSize(14);
    doc.text(`${cinemaName}`, 10, 20);
    doc.text(`${i18n.t('movie')}: ${movieTitle}`, 10, 30);
    doc.text(`${i18n.t('showtime')}: ${formatLocalDate(showtimeStartTime)}`, 10, 40);
    doc.text(`${i18n.t('hall')}: ${hallName}`, 10, 50);
    doc.text(`${i18n.t('seats')}:`, 10, 60);
    tickets.forEach((ticket, index) => {
        doc.text(
            `${i18n.t('row')} ${ticket.seat.rowNumber} ${i18n.t('seat')} ${ticket.seat.seatNumber} (${mapTicketType(ticket.type)} - ${ticket.price.toFixed(2)} ${i18n.t('BGN')})`,
            20,
            70 + (index * 10)
        );
    });
    doc.text(`${i18n.t('shortcode')}: ${shortcode}`, 146, 75);
    doc.text(`${i18n.t('totalPrice')}: ${totalPrice.toFixed(2)} ${i18n.t('BGN')}`, 10, 70 + (tickets.length * 10));
    doc.barcode(`${shortcode}`, {
        fontSize: 60,
        x: 140,
        y: 70,
    });

    doc.save(`booking_${shortcode}.pdf`);
};

export const generateTicketPDF = async (ticket) => {
    setupFonts();
    const doc = new jsPDF();
    generateTicket(ticket, doc);

    doc.save(`ticket_${ticket.shortcode}.pdf`);
};

export const generateTicketsPDF = async (tickets) => {
    setupFonts();
    const doc = new jsPDF();

    tickets.forEach((ticket, index) => {
        if (index > 0) {
            doc.addPage();
        }

        generateTicket(ticket, doc);
    });

    const timestamp = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(/[/,:\s]/g, '_');

    doc.save(`tickets_${timestamp}.pdf`);
};

function generateTicket(ticket, doc) {
    const { movieTitle, cinemaName, hallName, showtimeStartTime, seat, type, price, shortcode } = ticket;

    doc.setFontSize(20);
    doc.setFont('Roboto-Regular');
    doc.text(i18n.t('ticketDetails'), 10, 10);

    doc.setFontSize(14);
    doc.text(`${cinemaName}`, 10, 20);
    doc.text(`${i18n.t('movie')}: ${movieTitle}`, 10, 30);
    doc.text(`${i18n.t('hall')}: ${hallName}`, 10, 40);
    doc.text(`${i18n.t('showtime')}: ${formatLocalDate(showtimeStartTime)}`, 10, 50);
    doc.text(`${i18n.t('seat')}: ${i18n.t('row')} ${seat.rowNumber} ${i18n.t('seat')} ${seat.seatNumber}`, 10, 60);
    doc.text(`${i18n.t('type')}: ${mapTicketType(type)}`, 10, 70);
    doc.text(`${i18n.t('price')}: ${price.toFixed(2)} ${i18n.t('BGN')}`, 10, 80);

    doc.text(`${i18n.t('shortcode')}: ${shortcode}`, 146, 75);
    doc.barcode(`${shortcode}`, {
        fontSize: 60,
        x: 140,
        y: 70,
    });
}
