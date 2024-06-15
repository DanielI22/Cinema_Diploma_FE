import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MyTicketsPage from './MyTicketsPage';
import * as ticketService from '../../../services/ticketService';
import * as pdfGenerator from '../../../utils/pdfGenerator';

// Mock CSS modules
vi.mock('./MyTicketsPage.module.css', () => ({ default: {} }));

// Mock react-i18next
vi.mock('react-i18next', async () => {
    const original = await vi.importActual('react-i18next');
    return {
        ...original,
        useTranslation: () => ({
            t: (key) => key,
            i18n: {
                language: 'en',
                changeLanguage: () => Promise.resolve(),
            },
        }),
    };
});

describe('MyTicketsPage Component', () => {
    const mockTickets = [
        {
            id: '1',
            movieTitle: 'Movie 1',
            moviePoster: 'poster1.jpg',
            cinemaName: 'Cinema 1',
            hallName: 'Hall 1',
            showtimeStartTime: new Date(Date.now() + 86400000).toISOString(), // Upcoming ticket
            seat: { rowNumber: 1, seatNumber: 1 },
            type: 'normal',
            price: 10,
            shortcode: '12345',
        },
        {
            id: '2',
            movieTitle: 'Movie 2',
            moviePoster: 'poster2.jpg',
            cinemaName: 'Cinema 2',
            hallName: 'Hall 2',
            showtimeStartTime: new Date(Date.now() - 86400000).toISOString(), // Passed ticket
            seat: { rowNumber: 2, seatNumber: 2 },
            type: 'normal',
            price: 15,
            shortcode: '67890',
        },
    ];

    beforeEach(() => {
        vi.spyOn(ticketService, 'getMyTickets').mockResolvedValue({ tickets: mockTickets });
        vi.spyOn(pdfGenerator, 'generateTicketPDF').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const setup = () => {
        render(
            <MemoryRouter>
                <MyTicketsPage />
            </MemoryRouter>
        );
    };

    test('handles ticket download as PDF', async () => {
        setup();

        await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

        fireEvent.click(screen.getAllByText('downloadAsPDF')[0]);

        expect(pdfGenerator.generateTicketPDF).toHaveBeenCalled();
    });
});
