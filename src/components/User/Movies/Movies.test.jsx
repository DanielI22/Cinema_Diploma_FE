import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Movies from './Movies';
import * as movieService from '../../../services/movieService';
import * as genreService from '../../../services/genreService';

vi.mock('./Movies.module.css', () => ({ default: {} }));

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

describe('Movies Component', () => {
    const mockMovies = [
        { id: '1', title: 'Movie 1', genres: [{ name: 'Action' }] },
        { id: '2', title: 'Movie 2', genres: [{ name: 'Comedy' }] },
    ];

    const mockGenres = [
        { id: '1', name: 'Action' },
        { id: '2', name: 'Comedy' },
    ];

    beforeEach(() => {
        vi.spyOn(movieService, 'getAll').mockResolvedValue({ movies: mockMovies });
        vi.spyOn(genreService, 'getAll').mockResolvedValue({ genres: mockGenres });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const setup = () => {
        render(<Movies />);
    };

    test('shows message when no movies are found', async () => {
        vi.spyOn(movieService, 'getAll').mockResolvedValue({ movies: [] });

        setup();

        await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

        expect(screen.getByText('noMovies')).toBeInTheDocument();
    });
});
