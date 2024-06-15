import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login';
import { useAuth } from '../../contexts/authContext';
import { PATHS, ROLES } from '../../utils/constants';

// Mock useAuth hook
vi.mock('../../contexts/authContext', () => ({
  useAuth: vi.fn(),
}));

// Mock i18n
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

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
    Link: original.Link,
    useLocation: () => ({
      state: {
        from: { pathname: PATHS.HOME }
      }
    })
  };
});

describe('Login Component', () => {
  const loginSubmitHandler = vi.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      loginSubmitHandler,
    });
    loginSubmitHandler.mockResolvedValue(ROLES.USER);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /forgotPassword/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resendVerification/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });
});
