import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminHome from './AdminHome';
import { PATHS } from '../../../utils/constants';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('AdminHome Component', () => {
  test('renders the header', () => {
    render(
      <BrowserRouter>
        <AdminHome />
      </BrowserRouter>
    );

    const headerElement = screen.getByText('manageYourCinemas');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the dashboard links', () => {
    render(
      <BrowserRouter>
        <AdminHome />
      </BrowserRouter>
    );

    const links = [
      { path: PATHS.MANAGE_CINEMAS, text: 'manageCinemas' },
      { path: PATHS.MANAGE_HALLS, text: 'manageHalls' },
      { path: PATHS.MANAGE_MOVIES, text: 'manageMovies' },
      { path: PATHS.MANAGE_GENRES, text: 'manageGenres' },
      { path: PATHS.MANAGE_SHOWTIMES, text: 'manageShowtimes' },
      { path: PATHS.MANAGE_USERS, text: 'manageUsers' },
    ];

    links.forEach((link) => {
      const linkElement = screen.getByText(link.text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', link.path);
    });
  });
});
