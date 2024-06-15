import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ForgotPassword from './ForgotPassword';
import { sendForgotPasswordEmail } from '../../services/authService';

// Mocking react-i18next for translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mocking sendForgotPasswordEmail function
vi.mock('../../services/authService', () => ({
  sendForgotPasswordEmail: vi.fn(),
}));

describe('ForgotPassword Component', () => {
  const renderComponent = () => {
    return render(<ForgotPassword />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the component', () => {
    renderComponent();
    expect(screen.getByText('forgotPassword')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enterYourEmail')).toBeInTheDocument();
    expect(screen.getByText('sendResetLink')).toBeInTheDocument();
  });

  test('handles input change', () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText('enterYourEmail');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('calls sendForgotPasswordEmail on form submission', async () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText('enterYourEmail');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByText('sendResetLink');
    fireEvent.click(submitButton);

    expect(sendForgotPasswordEmail).toHaveBeenCalledWith('test@example.com');
  });
});
