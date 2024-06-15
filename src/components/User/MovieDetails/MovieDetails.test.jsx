import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import MovieDetails from './MovieDetails';
import * as movieService from '../../../services/movieService';
import * as favouriteService from '../../../services/favouriteService';
import * as authContext from '../../../contexts/authContext';
import * as functions from '../../../utils/functions';

// Mock CSS modules
vi.mock('./MovieDetails.module.css', () => ({ default: {} }));

// Mock child components
vi.mock('../ReviewArea/ReviewArea', () => ({
    default: () => <div>Review Area Mock</div>,
}));

vi.mock('../MovieProgram/MovieProgram', () => ({
    default: () => <div>Movie Program Mock</div>,
}));

vi.mock('../../BackButton/BackButton', () => ({
    default: () => <button>Back</button>,
}));

vi.mock('../../Spinner/Spinner', () => ({
    default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('../../NotFound/NotFound', () => ({
    default: () => <div>Not Found</div>,
}));

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

// Mock IntersectionObserver
beforeAll(() => {
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    }));
});

// Mock matchMedia
beforeAll(() => {
    Object.defineProperty(global, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe('MovieDetails Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    const mockMovie = {
        id: '1',
        title: 'Mock Movie',
        releaseYear: 2024,
        imageUrl: 'http://example.com/image.jpg',
        genres: ['Action', 'Adventure'],
        description: 'A great movie',
        duration: 120,
        trailerUrl: 'mock-trailer-url',
    };

    const setup = () => {
        vi.spyOn(functions, 'isValidUUID').mockReturnValue(true);
        vi.spyOn(movieService, 'getOne').mockResolvedValue({ movie: mockMovie });
        vi.spyOn(favouriteService, 'verifyFavourite').mockResolvedValue({ isFavourite: true });
        vi.spyOn(favouriteService, 'addFavourite').mockResolvedValue({ favourite: true });
        vi.spyOn(favouriteService, 'deleteFavourite').mockResolvedValue({});
        vi.spyOn(authContext, 'useAuth').mockReturnValue({
            userDetails: { role: 'user' },
            isAuthenticated: true,
        });

        render(
            <MemoryRouter initialEntries={['/movie/1']}>
                <Routes>
                    <Route path="/movie/:movieId" element={<MovieDetails />} />
                </Routes>
            </MemoryRouter>
        );
    };

    test('displays Spinner while loading', () => {
        setup();
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
});
