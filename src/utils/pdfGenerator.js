import jsPDF from 'jspdf';
import "jspdf-barcode";

export const generateBookingPDF = async (booking) => {
    const doc = new jsPDF();
    const { movieTitle, cinemaName, hallName, showtimeStartTime, tickets, shortcode, totalPrice } = booking;
    
    doc.setFont("Helvetica");
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
    doc.text(`Hall: ${hallName}`, 10, 50);
    doc.text('Seats:', 10, 60);
    tickets.forEach((ticket, index) => {
        doc.text(
            `Row ${ticket.seat.rowNumber} Seat ${ticket.seat.seatNumber} (${ticket.type} - ${ticket.price.toFixed(2)} BGN)`,
            20,
            70 + (index * 10)
        );
    });
    doc.text(`Shortcode: ${shortcode}`, 146, 75);
    doc.text(`Total Price: ${totalPrice.toFixed(2)} BGN`, 10, 70 + (tickets.length * 10));
    doc.barcode(`${shortcode}`, {
        fontSize: 60,
        x: 140,
        y: 70,
    })

    doc.save(`booking_${shortcode}.pdf`);
};

export const generateTicketPDF = async (ticket) => {
    const doc = new jsPDF();
    generateTicket(ticket, doc);

    doc.save(`ticket_${shortcode}.pdf`);
};

export const generateTicketsPDF = async (tickets) => {
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
    doc.setFont("Helvetica");
    doc.text('Ticket Details', 10, 10);

    doc.setFontSize(14);
    doc.text(`${cinemaName}`, 10, 20);
    doc.text(`Movie: ${movieTitle}`, 10, 30);
    doc.text(`Hall: ${hallName}`, 10, 40);
    doc.text(`Showtime: ${new Date(showtimeStartTime).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })}`, 10, 50);

    doc.text(`Seat: Row ${seat.rowNumber} Seat ${seat.seatNumber}`, 10, 60);
    doc.text(`Type: ${type}`, 10, 70);
    doc.text(`Price: ${price.toFixed(2)} BGN`, 10, 80);

    doc.text(`Shortcode: ${shortcode}`, 146, 75);
    doc.barcode(`${shortcode}`, {
        fontSize: 60,
        x: 140,
        y: 70,
    });
} 