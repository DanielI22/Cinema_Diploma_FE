import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ValidatorHome from './ValidatorHome';
import { vi } from 'vitest';
import { PATHS } from '../../../utils/constants';

// Mock translation module
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key, // Simply return the key for testing purposes
    }),
}));

describe('ValidatorHome Component', () => {
    const setup = () => {
        render(
            <MemoryRouter>
                <ValidatorHome />
            </MemoryRouter>
        );
    };

    test('renders header with correct translation', () => {
        setup();
        expect(screen.getByText('validator')).toBeInTheDocument();
    });

    test('renders validate ticket link with correct translation', () => {
        setup();
        expect(screen.getByText('validateTicket')).toBeInTheDocument();
    });

    test('renders validate ticket link with correct path', () => {
        setup();
        expect(screen.getByText('validateTicket')).toHaveAttribute('href', `${PATHS.VALIDATE_TICKET}`);
    });
});
