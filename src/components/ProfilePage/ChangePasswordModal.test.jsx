import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChangePasswordModal from './ChangePasswordModal';
import Modal from 'react-modal';
import * as userService from '../../services/userService';
import { useAuth } from '../../contexts/authContext';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mocking dependencies
vi.mock('../../services/userService', () => ({
    updatePassword: vi.fn(),
}));

vi.mock('../../contexts/authContext', () => ({
    useAuth: () => ({
        logoutHandler: vi.fn(),
    }),
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

describe('ChangePasswordModal Component', () => {
    beforeAll(() => {
        Modal.setAppElement(document.createElement('div'));
    });

    const setup = (isOpen = true) => {
        render(
            <MemoryRouter>
                <ChangePasswordModal isOpen={isOpen} onClose={vi.fn()} />
            </MemoryRouter>
        );
    };

    test('renders the modal when open', () => {
        setup();

        expect(screen.getByText(/changePassword/i)).toBeInTheDocument();
    });
});
