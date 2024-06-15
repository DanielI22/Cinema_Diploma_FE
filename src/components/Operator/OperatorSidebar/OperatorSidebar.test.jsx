import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OperatorSidebar from './OperatorSidebar';
import { PATHS } from '../../../utils/constants';

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

// Mock useTranslation from react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'en',
      changeLanguage: () => Promise.resolve(),
    },
  }),
}));

describe('OperatorSidebar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all navigation buttons', () => {
    render(<OperatorSidebar />);

    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/ticketsHistory/i)).toBeInTheDocument();
    expect(screen.getByText(/changeCinema/i)).toBeInTheDocument();
  });

  test('navigates to profile when Profile button is clicked', () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    render(<OperatorSidebar />);

    fireEvent.click(screen.getByText(/profile/i));
    expect(navigate).toHaveBeenCalledWith(PATHS.MY_PROFILE);
  });

  test('navigates to ticket history when Ticket History button is clicked', () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    render(<OperatorSidebar />);

    fireEvent.click(screen.getByText(/ticketsHistory/i));
    expect(navigate).toHaveBeenCalledWith(PATHS.TICKET_HISTORY);
  });

  test('navigates to cinema selection when Change Cinema button is clicked', () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    render(<OperatorSidebar />);

    fireEvent.click(screen.getByText(/changeCinema/i));
    expect(navigate).toHaveBeenCalledWith(PATHS.SELECT_CINEMA);
  });
});
