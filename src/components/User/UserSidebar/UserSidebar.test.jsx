import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import UserSidebar from './UserSidebar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Mock CSS modules
vi.mock('./UserSidebar.module.css', () => ({ default: {} }));

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

// Mock useTranslation from react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: vi.fn().mockReturnValue({
        t: (key) => key,
    }),
}));

describe('UserSidebar Component', () => {
    let navigateMock;

    beforeEach(() => {
        navigateMock = vi.fn();
        useNavigate.mockReturnValue(navigateMock);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    test('renders all buttons with correct text', () => {
        render(<UserSidebar />);

        expect(screen.getByText('profile')).toBeInTheDocument();
        expect(screen.getByText('favourites')).toBeInTheDocument();
        expect(screen.getByText('bookings')).toBeInTheDocument();
        expect(screen.getByText('tickets')).toBeInTheDocument();
    });
});
