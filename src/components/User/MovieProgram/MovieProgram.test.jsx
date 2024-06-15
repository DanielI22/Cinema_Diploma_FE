import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MovieProgram from './MovieProgram';
import * as showtimeService from '../../../services/showtimeService';
import * as dateFunctions from '../../../utils/functions';
import { useTranslation } from 'react-i18next';

// Mock CSS modules
vi.mock('./MovieProgram.module.css', () => ({ default: {} }));

// Mock i18n
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

// Mock DateNavigation
vi.mock('../DataNavigation/DateNavigation', () => ({
    default: ({ selectedDate, onSelectDate }) => (
        <div data-testid="date-navigation">
            <button onClick={() => onSelectDate(new Date('2024-06-20'))}>2024-06-20</button>
        </div>
    ),
}));

describe('MovieProgram Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    const mockShowtimes = [
        {
            id: '1',
            cinemaName: 'Cinema 1',
            startTime: '2024-06-20T14:00:00Z',
            type: '3D',
            ticketPrice: 12.50,
        },
        {
            id: '2',
            cinemaName: 'Cinema 1',
            startTime: '2024-06-20T18:00:00Z',
            type: '2D',
            ticketPrice: 10.00,
        },
    ];

    const setup = () => {
        vi.spyOn(showtimeService, 'getByMovieDate').mockResolvedValue({
            showtimes: mockShowtimes,
        });
        vi.spyOn(dateFunctions, 'isValidUUID').mockReturnValue(true);

        render(
            <MemoryRouter>
                <MovieProgram movieId="1" />
            </MemoryRouter>
        );
    };

    test('displays no showtimes message when no showtimes are available', async () => {
        vi.spyOn(showtimeService, 'getByMovieDate').mockResolvedValue({ showtimes: [] });

        setup();

        // Verify if no showtimes message is displayed
        await waitFor(() => expect(screen.getByText('noShowtimesAvailable')).toBeInTheDocument());
    });
});
