import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import CinemaListPage from './CinemaListPage';
import * as cinemaService from '../../../services/cinemaService';

// Mock CSS modules
vi.mock('./CinemaListPage.module.css', () => ({ default: {} }));

// Mock CinemaCard CSS modules
vi.mock('../../User/CinemaCard/CinemaCard.module.css', () => ({ default: {} }));

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

// Mock cinemaService
vi.mock('../../../services/cinemaService', () => ({
    getAll: vi.fn(),
}));

describe('CinemaListPage Component', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        vi.resetAllMocks();
    });

    const setup = () => {
        return render(
            <MemoryRouter>
                <CinemaListPage />
            </MemoryRouter>
        );
    };

    test('renders list of cinemas after data fetch', async () => {
        // Mock cinema data
        const mockCinemas = [
            { id: '1', name: 'Cinema 1', location: 'Location 1', imageUrl: '/image1.jpg' },
            { id: '2', name: 'Cinema 2', location: 'Location 2', imageUrl: '/image2.jpg' },
        ];

        // Mock the getAll method
        cinemaService.getAll.mockResolvedValueOnce({ cinemas: mockCinemas });

        setup();

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Cinema 1')).toBeInTheDocument();
        expect(screen.getByText('Cinema 2')).toBeInTheDocument();
    });
});
