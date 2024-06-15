import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TicketHistory from './TicketHistory';
import * as ticketService from '../../../services/ticketService';
import { vi } from 'vitest';

// Mock services and hooks
vi.mock('../../../services/ticketService', () => ({
    getOperatorTickets: vi.fn(),
}));

vi.mock('../../../contexts/cinemaContext', () => ({
    useCinema: () => ({
        selectedCinema: { id: 'cinema123' },
    }),
}));

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

describe('TicketHistory Component', () => {
    const mockTickets = {
        tickets: [
            {
                id: '1',
                movieTitle: 'Test Movie',
                showtimeStartTime: '2024-07-01T14:00:00',
                type: 'STANDARD',
                price: 10.0,
                shortcode: '12345',
                soldTime: '2024-07-01T13:00:00',
            },
        ],
        totalPages: 1,
    };

    beforeEach(() => {
        ticketService.getOperatorTickets.mockResolvedValue(mockTickets);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('handles pagination', async () => {
        render(
            <MemoryRouter>
                <TicketHistory />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('page 1 of 1')).toBeInTheDocument();
        });

        const nextPageButton = screen.getByText('next');
        expect(nextPageButton).toBeDisabled();

        const previousPageButton = screen.getByText('previous');
        expect(previousPageButton).toBeDisabled();
    });
});
