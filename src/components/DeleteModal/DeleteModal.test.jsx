import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DeleteModal from './DeleteModal';

// Mock react-i18next for translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('DeleteModal Component', () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  const renderComponent = (props) => {
    return render(
      <DeleteModal
        showModal={props.showModal}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
      />
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly when showModal is true', () => {
    renderComponent({
      showModal: true,
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
    });

    expect(screen.getByText('deleteConfirmation')).toBeInTheDocument();
    expect(screen.getByText('deleteConfirmationMessage')).toBeInTheDocument();
    expect(screen.getByText('confirm')).toBeInTheDocument();
    expect(screen.getByText('cancel')).toBeInTheDocument();
  });

  test('does not render when showModal is false', () => {
    renderComponent({
      showModal: false,
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
    });

    expect(screen.queryByText('deleteConfirmation')).not.toBeInTheDocument();
  });

  test('calls onConfirm when confirm button is clicked', () => {
    renderComponent({
      showModal: true,
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
    });

    fireEvent.click(screen.getByText('confirm'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    renderComponent({
      showModal: true,
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
    });

    fireEvent.click(screen.getByText('cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('calls onCancel when clicking on the modal background', () => {
    renderComponent({
      showModal: true,
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
    });

    fireEvent.click(screen.getByTestId('modal-background'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('does not call onCancel when clicking inside the modal content', () => {
    renderComponent({
      showModal: true,
      onConfirm: mockOnConfirm,
      onCancel: mockOnCancel,
    });

    fireEvent.click(screen.getByTestId('modal-content'));
    expect(mockOnCancel).not.toHaveBeenCalled();
  });
});
