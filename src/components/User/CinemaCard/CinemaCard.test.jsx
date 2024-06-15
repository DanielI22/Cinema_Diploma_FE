import React from 'react';
import { render, screen } from '@testing-library/react';
import CinemaCard from './CinemaCard';
import { vi } from 'vitest';

// Mock CSS Modules with a default export that returns an empty object
vi.mock('./CinemaCard.module.css', () => ({ default: {} }));

describe('CinemaCard Component', () => {
    const mockCinema = {
        id: '1',
        name: 'Cinema 1',
        location: 'Location 1',
        imageUrl: 'https://via.placeholder.com/150',
    };

    test('renders the CinemaCard component with provided data', () => {
        render(<CinemaCard cinema={mockCinema} />);
        
        const cinemaName = screen.getByText(mockCinema.name);
        const cinemaLocation = screen.getByText(mockCinema.location);
        const cinemaImage = screen.getByAltText(mockCinema.name);

        expect(cinemaName).toBeInTheDocument();
        expect(cinemaLocation).toBeInTheDocument();
        expect(cinemaImage).toHaveAttribute('src', mockCinema.imageUrl);
    });

    test('renders correctly when imageUrl is missing', () => {
        const mockCinemaWithoutImage = {
            ...mockCinema,
            imageUrl: '',
        };

        render(<CinemaCard cinema={mockCinemaWithoutImage} />);

        const cinemaImage = screen.getByAltText(mockCinemaWithoutImage.name);
        expect(cinemaImage).toHaveAttribute('src', '');
    });
});
