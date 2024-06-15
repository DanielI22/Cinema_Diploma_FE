import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectorHome from './ProjectorHome';
import * as showtimeService from '../../../services/showtimeService';
import * as cinemaService from '../../../services/cinemaService';
import { useCinema } from '../../../contexts/cinemaContext';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock dependencies
vi.mock('../../../services/showtimeService', () => ({
    getByHallAndDate: vi.fn(),
    setCurrentShowtime: vi.fn(),
    endShowtime: vi.fn(),
    setUpcomingShowtime: vi.fn(),
}));

vi.mock('../../../services/cinemaService', () => ({
    getHalls: vi.fn(),
}));

vi.mock('../../../contexts/cinemaContext', () => ({
    useCinema: vi.fn(),
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

describe('ProjectorHome Component', () => {
    const mockHalls = [
        { id: '1', name: 'Hall 1' },
        { id: '2', name: 'Hall 2' },
    ];
    const mockShowtimes = [
        {
            id: '1',
            movieName: 'Movie 1',
            startTime: new Date().toISOString(),
            movieDuration: 120,
            type: '2D',
            isCurrent: false,
            isEnded: false,
        },
        {
            id: '2',
            movieName: 'Movie 2',
            startTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
            movieDuration: 90,
            type: '3D',
            isCurrent: false,
            isEnded: false,
        },
    ];

    beforeEach(() => {
        useCinema.mockReturnValue({
            selectedCinema: { id: 'cinema1', name: 'Cinema 1' },
        });

        cinemaService.getHalls.mockResolvedValue({ halls: mockHalls });
        showtimeService.getByHallAndDate.mockResolvedValue({ showtimes: mockShowtimes });
        showtimeService.setCurrentShowtime.mockResolvedValue({});
        showtimeService.endShowtime.mockResolvedValue({});
        showtimeService.setUpcomingShowtime.mockResolvedValue({});
    });

    const setup = () => {
        render(
            <MemoryRouter>
                <ProjectorHome />
            </MemoryRouter>
        );
    };

    test('renders halls and allows selection', async () => {
        setup();

        await waitFor(() => {
            expect(screen.getByLabelText(/selectHall/i)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText(/selectHall/i), { target: { value: '1' } });

        await waitFor(() => {
            expect(showtimeService.getByHallAndDate).toHaveBeenCalledWith('1', expect.any(String));
        });
    });

    test('handles set current showtime action', async () => {
        setup();

        fireEvent.change(screen.getByLabelText(/selectHall/i), { target: { value: '1' } });

        await waitFor(() => {
            fireEvent.click(screen.getAllByText(/setLive/i)[0]);
        });

        await waitFor(() => {
            expect(showtimeService.setCurrentShowtime).toHaveBeenCalledWith('1');
        });
    });

    test('handles end showtime action', async () => {
        setup();

        fireEvent.change(screen.getByLabelText(/selectHall/i), { target: { value: '1' } });

        await waitFor(() => {
            fireEvent.click(screen.getAllByText(/ended/i)[0]);
        });

        await waitFor(() => {
            expect(showtimeService.endShowtime).toHaveBeenCalledWith('1');
        });
    });
});
