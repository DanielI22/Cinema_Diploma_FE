import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import UserModal from './UserModal';
import * as userService from '../../../services/userService';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../locales/i18n';

// Mock Modal to prevent actual rendering
vi.mock('react-modal', () => {
  return {
    default: ({ isOpen, children }) => isOpen ? <div data-testid="modal">{children}</div> : null
  };
});

// Mock the addUser service function
vi.spyOn(userService, 'addUser').mockResolvedValue({});

describe('UserModal Component', () => {
  const mockOnClose = vi.fn();
  const mockRefreshUsers = vi.fn();

  const renderComponent = (props) => {
    return render(
      <I18nextProvider i18n={i18n}>
        <UserModal
          isOpen={props.isOpen}
          onClose={props.onClose}
          role={props.role}
          refreshUsers={props.refreshUsers}
        />
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('does not render when closed', () => {
    renderComponent({
      isOpen: false,
      onClose: mockOnClose,
      role: 'Admin',
      refreshUsers: mockRefreshUsers,
    });

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
