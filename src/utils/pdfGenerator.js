import jsPDF from 'jspdf';
import "jspdf-barcode";

export const generateBookingPDF = async (booking) => {
    const doc = new jsPDF();
    const { movieTitle, cinemaName, showtimeStartTime, tickets, shortcode, totalPrice } = booking;

    doc.setFontSize(20);
    doc.text('Booking Details', 10, 10);

    doc.setFontSize(14);
    doc.text(`${cinemaName}`, 10, 20);
    doc.text(`Movie: ${movieTitle}`, 10, 30);
    doc.text(`Showtime: ${new Date(showtimeStartTime).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })}`, 10, 40);

    doc.text('Seats:', 10, 50);
    tickets.forEach((ticket, index) => {
        doc.text(
            `Row ${ticket.seat.rowNumber} Seat ${ticket.seat.seatNumber} (${ticket.type} - ${ticket.price.toFixed(2)} BGN)`,
            20,
            60 + (index * 10)
        );
    });
    doc.text(`Shortcode: ${shortcode}`, 156, 85);
    doc.text(`Total Price: ${totalPrice.toFixed(2)} BGN`, 10, 60 + (tickets.length * 10));
    doc.barcode(`${shortcode}`, {
        fontSize: 60,
        x: 150,
        y: 80,
      })

    doc.save(`booking_${shortcode}.pdf`);
};

export const generateTicketPDF = async (ticket) => {
    const doc = new jsPDF();
    const { movieTitle, cinemaName, showtimeStartTime, seat, type, price, shortcode } = ticket;

    doc.setFontSize(20);
    doc.text('Ticket Details', 10, 10);

    doc.setFontSize(14);
    doc.text(`${cinemaName}`, 10, 20);
    doc.text(`Movie: ${movieTitle}`, 10, 30);
    doc.text(`Showtime: ${new Date(showtimeStartTime).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })}`, 10, 40);

    doc.text(`Seat: Row ${seat.rowNumber} Seat ${seat.seatNumber}`, 10, 50);
    doc.text(`Type: ${type}`, 10, 60);
    doc.text(`Price: ${price.toFixed(2)} BGN`, 10, 70);

    doc.text(`Shortcode: ${shortcode}`, 146, 65);
    doc.barcode(`${shortcode}`, {
        fontSize: 60,
        x: 140,
        y: 60,
      })

    doc.save(`ticket_${shortcode}.pdf`);
};
