import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Header from './Header';
import { useAuth } from '../../contexts/authContext';
import { useCinema } from '../../contexts/cinemaContext';
import { PATHS, ROLES } from '../../utils/constants';

// Mock dependencies
vi.mock('../../contexts/authContext');
vi.mock('../../contexts/cinemaContext');
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
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
  };
});

describe('Header Component', () => {
  const mockUserDetails = (role) => ({
    username: 'testUser',
    role: role,
  });

  const renderComponent = (role, isAuthenticated = true) => {
    useAuth.mockReturnValue({
      isAuthenticated: isAuthenticated,
      userDetails: mockUserDetails(role),
    });

    useCinema.mockReturnValue({
      selectedCinema: { name: 'Test Cinema' },
    });

    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  };

  test('renders the header for an authenticated user', () => {
    renderComponent(ROLES.USER);
    expect(screen.getByAltText('YourCinema')).toBeInTheDocument();
    expect(screen.getByText('testUser - Test Cinema')).toBeInTheDocument();
    expect(screen.getByText('logout')).toBeInTheDocument();
  });

  test('renders the header for an unauthenticated user', () => {
    renderComponent(ROLES.USER, false);
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });

  test('renders role-specific links for a user role', () => {
    renderComponent(ROLES.USER);
    expect(screen.getByText('favourites')).toBeInTheDocument();
    expect(screen.getByText('bookings')).toBeInTheDocument();
    expect(screen.getByText('tickets')).toBeInTheDocument();
  });

  test('renders role-specific links for an operator role', () => {
    renderComponent(ROLES.OPERATOR);
    expect(screen.getByText('ticketsHistory')).toBeInTheDocument();
    expect(screen.getByText('changeCinema')).toBeInTheDocument();
  });

  test('renders role-specific links for a validator role', () => {
    renderComponent(ROLES.VALIDATOR);
    expect(screen.getByText('changeCinema')).toBeInTheDocument();
  });
});
