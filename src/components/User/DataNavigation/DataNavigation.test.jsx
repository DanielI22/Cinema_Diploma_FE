import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DateNavigation from './DateNavigation';

vi.mock('./DateNavigation.module.css', () => ({ default: {} }));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: {
            language: 'en',
            changeLanguage: () => Promise.resolve(),
        },
        t: (key) => key,
    }),
}));

describe('DateNavigation Component', () => {
    const mockOnSelectDate = vi.fn();
    const selectedDate = new Date();

    beforeEach(() => {
        mockOnSelectDate.mockClear();
    });

    test('calls onSelectDate when a date is clicked', () => {
        render(<DateNavigation selectedDate={selectedDate} onSelectDate={mockOnSelectDate} />);

        // Get a button for another date
        const nextDate = new Date();
        nextDate.setDate(selectedDate.getDate() + 1);
        const nextButton = screen.getByText(nextDate.toLocaleDateString('en', {
            weekday: 'short',
            month: '2-digit',
            day: '2-digit'
        }));

        // Click the next date button
        fireEvent.click(nextButton);

        // Ensure the onSelectDate function was called with the correct date
        const expectedDate = new Date(nextDate).setMilliseconds(0); // Remove milliseconds for comparison
        const actualDate = new Date(mockOnSelectDate.mock.calls[0][0]).setMilliseconds(0); // Remove milliseconds from actual call
        expect(actualDate).toBe(expectedDate);
    });
});
