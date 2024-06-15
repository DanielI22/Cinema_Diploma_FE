// Home.test.jsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Home from './Home';

// Mock CSS modules
vi.mock('./Home.module.css', () => ({ default: {} }));

// Mock MovieCarousel component
vi.mock('../MovieCarousel/MovieCarousel', () => ({
    __esModule: true,
    default: () => <div>Movie Carousel Mock</div>,
}));

// Mock i18next
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

describe('Home Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('renders welcome title and description', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        expect(screen.getByText('welcome')).toBeInTheDocument();
        expect(screen.getByText('description')).toBeInTheDocument();
    });

    test('renders MovieCarousel component', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        expect(screen.getByText('Movie Carousel Mock')).toBeInTheDocument();
    });

    test('renders link to program page', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        const programLink = screen.getByRole('link', { name: 'getTickets' });
        expect(programLink).toBeInTheDocument();
        expect(programLink).toHaveAttribute('href', '/program');
    });
});
