import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ReviewList from './ReviewList';
import { useAuth } from '../../../contexts/authContext';

vi.mock('./ReviewList.module.css', () => ({ default: {} }));

vi.mock('../../../contexts/authContext', () => ({
    useAuth: vi.fn(),
}));

describe('ReviewList Component', () => {
    const mockReviews = [
        { id: '1', userId: 'user1', username: 'User One', reviewText: 'Great movie!', sentiment: 'positive' },
        { id: '2', userId: 'user2', username: 'User Two', reviewText: 'Not bad.', sentiment: 'neutral' },
    ];

    const setup = (userDetails = { userId: 'user1', role: 'user' }, onDeleteReview = vi.fn()) => {
        useAuth.mockReturnValue({ userDetails });
        return render(<ReviewList reviews={mockReviews} onDeleteReview={onDeleteReview} />);
    };

    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('renders reviews correctly', () => {
        setup();
        expect(screen.getByText('Great movie!')).toBeInTheDocument();
        expect(screen.getByText('Not bad.')).toBeInTheDocument();
        expect(screen.getByText('User One')).toBeInTheDocument();
        expect(screen.getByText('User Two')).toBeInTheDocument();
    });

    test('displays correct sentiment emoji', () => {
        setup();
        expect(screen.getByText('😊')).toBeInTheDocument();
        expect(screen.getByText('😐')).toBeInTheDocument();
    });

    test('does not show delete button for other users', () => {
        setup({ userId: 'user3', role: 'user' });
        expect(screen.queryByRole('button', { name: /trash-alt/i })).not.toBeInTheDocument();
    });
});
