import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { useAuth } from '../../contexts/authContext';
import * as userService from '../../services/userService';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock dependencies
vi.mock('../../contexts/authContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../../services/userService', () => ({
    updateUsername: vi.fn(),
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

describe('ProfilePage Component', () => {
    const mockLogoutHandler = vi.fn();

    beforeEach(() => {
        useAuth.mockReturnValue({
            userDetails: {
                username: 'testuser',
                email: 'test@example.com',
                role: 'USER',
            },
            logoutHandler: mockLogoutHandler,
        });
    });

    const setup = () => {
        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );
    };

    test('renders user profile details', () => {
        setup();

        expect(screen.getByText(/profile/i)).toBeInTheDocument();
        expect(screen.getByText(/email/i)).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText(/username/i)).toBeInTheDocument();
        expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    test('allows username editing', async () => {
        setup();

        fireEvent.click(screen.getByText(/edit/i));

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'newusername' } });

        fireEvent.click(screen.getByText(/submit/i));

        await waitFor(() => {
            expect(userService.updateUsername).toHaveBeenCalledWith({ username: 'newusername' });
            expect(mockLogoutHandler).toHaveBeenCalled();
        });
    });
});
