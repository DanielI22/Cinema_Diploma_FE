import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TicketValidation from './TicketValidation';
import { vi } from 'vitest';
import { useCinema } from '../../../contexts/cinemaContext';
import * as ticketService from '../../../services/ticketService';

// Mock dependencies
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
    // Correctly mock initReactI18next if it needs to be used or initialized in your components.
    initReactI18next: {
        type: '3rdParty',
        init: () => {},
    },
}));

vi.mock('../../../contexts/cinemaContext', () => ({
    useCinema: () => ({
        selectedCinema: { id: '1' },
    }),
}));

vi.mock('../../../services/ticketService');

describe('TicketValidation Component', () => {
    const setup = () => render(<TicketValidation />);

    beforeEach(() => {
        ticketService.validateTicket.mockClear();
    });

    test('renders the header and input', () => {
        setup();
        expect(screen.getByText('validateTicket')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('enterTicketCode')).toBeInTheDocument();
    });
});
