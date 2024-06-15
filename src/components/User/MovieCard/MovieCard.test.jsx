import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MovieCard from './MovieCard';
import { PATHS } from '../../../utils/constants';

// Mock CSS modules
vi.mock('./MovieCard.module.css', () => ({ default: {} }));

// Mock genresToString function
vi.mock('../../../utils/functions', () => ({
    genresToString: (genres) => genres.join(', '),
}));

describe('MovieCard Component', () => {
    const movie = {
        id: '123',
        title: 'Test Movie',
        imageUrl: '/test-movie.jpg',
        genres: ['Action', 'Drama'],
    };

    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('renders movie title and genres', () => {
        render(
            <BrowserRouter>
                <MovieCard movie={movie} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('Action, Drama')).toBeInTheDocument();
    });

    test('renders movie image with correct src and alt', () => {
        render(
            <BrowserRouter>
                <MovieCard movie={movie} />
            </BrowserRouter>
        );

        const image = screen.getByAltText('Test Movie');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/test-movie.jpg');
    });

    test('redirects to movie page when redirect is true', () => {
        render(
            <BrowserRouter>
                <MovieCard movie={movie} redirect={true} />
            </BrowserRouter>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `${PATHS.MOVIES}/123`);
    });

    test('does not wrap in link when redirect is false', () => {
        render(
            <BrowserRouter>
                <MovieCard movie={movie} redirect={false} />
            </BrowserRouter>
        );

        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
});
