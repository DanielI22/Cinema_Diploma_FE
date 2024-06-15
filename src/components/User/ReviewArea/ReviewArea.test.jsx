import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import ReviewArea from './ReviewArea';
import * as reviewService from '../../../services/reviewService';
import { useAuth } from '../../../contexts/authContext';

// Mock CSS modules
vi.mock('./ReviewArea.module.css', () => ({ default: {} }));

// Mock Translation
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

// Mock Auth Context
vi.mock('../../../contexts/authContext', () => ({
    useAuth: vi.fn(),
}));

// Mock Services
vi.mock('../../../services/reviewService', () => ({
    getReviewsByMovieId: vi.fn(),
    addMovieReview: vi.fn(),
    deleteReview: vi.fn(),
    deleteMyReview: vi.fn(),
}));

describe('ReviewArea Component', () => {
    const mockReviews = [
        { id: '1', username: 'user1', reviewText: 'Great movie!' },
        { id: '2', username: 'user2', reviewText: 'Not bad.' },
    ];

    const setup = (isAuthenticated = true, role = 'user', initialEntries = ['/movie/1']) => {
        useAuth.mockReturnValue({
            isAuthenticated,
            userDetails: { username: 'currentUser', role },
        });

        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path="/movie/:movieId" element={<ReviewArea />} />
                </Routes>
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        vi.resetAllMocks();
    });


    test('renders reviews after successful fetch', async () => {
        reviewService.getReviewsByMovieId.mockResolvedValue({ reviews: mockReviews });

        setup();

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Great movie!')).toBeInTheDocument();
        expect(screen.getByText('Not bad.')).toBeInTheDocument();
    });

    test('handles submitting a new review', async () => {
        reviewService.getReviewsByMovieId.mockResolvedValue({ reviews: mockReviews });
        reviewService.addMovieReview.mockResolvedValue({ review: { id: '3', username: 'currentUser', reviewText: 'Nice!' } });

        setup();

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });

        const textarea = screen.getByPlaceholderText('leaveReview');
        fireEvent.change(textarea, { target: { value: 'Nice!' } });

        const sendButton = screen.getByText('send');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Nice!')).toBeInTheDocument();
        });
    });


    test('does not allow submitting an empty review', async () => {
        reviewService.getReviewsByMovieId.mockResolvedValue({ reviews: mockReviews });

        setup();

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        });

        const sendButton = screen.getByText('send');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Great movie!')).toBeInTheDocument();
            expect(screen.getByText('Not bad.')).toBeInTheDocument();
        });

        expect(reviewService.addMovieReview).not.toHaveBeenCalled();
    });
});
