import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenreSelect from './GenreSelect';

describe('GenreSelect Component', () => {
  const mockAllGenres = [
    { id: '1', name: 'Action' },
    { id: '2', name: 'Comedy' },
    { id: '3', name: 'Drama' },
  ];

  const mockSelectedGenres = [
    { id: '2', name: 'Comedy' }
  ];

  const mockHandleGenreChange = vi.fn();
  const mockHandleCreateGenre = vi.fn();

  const renderComponent = (props) => {
    return render(
      <GenreSelect
        allGenres={props.allGenres}
        selectedGenres={props.selectedGenres}
        handleGenreChange={props.handleGenreChange}
        handleCreateGenre={props.handleCreateGenre}
      />
    );
  };

  test('renders without crashing', () => {
    renderComponent({
      allGenres: mockAllGenres,
      selectedGenres: mockSelectedGenres,
      handleGenreChange: mockHandleGenreChange,
      handleCreateGenre: mockHandleCreateGenre,
    });

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('renders options correctly', () => {
    renderComponent({
      allGenres: mockAllGenres,
      selectedGenres: mockSelectedGenres,
      handleGenreChange: mockHandleGenreChange,
      handleCreateGenre: mockHandleCreateGenre,
    });

    const selectInput = screen.getByRole('combobox');
    fireEvent.mouseDown(selectInput);

    mockAllGenres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });

  test('handles selection change', () => {
    renderComponent({
      allGenres: mockAllGenres,
      selectedGenres: mockSelectedGenres,
      handleGenreChange: mockHandleGenreChange,
      handleCreateGenre: mockHandleCreateGenre,
    });

    const selectInput = screen.getByRole('combobox');
    fireEvent.mouseDown(selectInput);

    const newOption = screen.getByText('Action');
    fireEvent.click(newOption);

    expect(mockHandleGenreChange).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ value: '1', label: 'Action' }),
      expect.objectContaining({ value: '2', label: 'Comedy' })
    ]));
  });

  test('shows selected genres correctly', () => {
    renderComponent({
      allGenres: mockAllGenres,
      selectedGenres: mockSelectedGenres,
      handleGenreChange: mockHandleGenreChange,
      handleCreateGenre: mockHandleCreateGenre,
    });

    // Check if the selected genre is displayed correctly
    expect(screen.getByText('Comedy')).toBeInTheDocument();
  });
});
