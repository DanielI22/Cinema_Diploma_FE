import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddEditCinemaPage from './AddEditCinemaPage';
import * as cinemaService from '../../../services/cinemaService';
import * as hallService from '../../../services/hallService';

vi.mock('../../../services/cinemaService');
vi.mock('../../../services/hallService');

describe('AddEditCinemaPage Component', () => {
    beforeEach(() => {
        hallService.getAvailable.mockResolvedValue({
            halls: [{ id: '1', name: 'Hall 1' }, { id: '2', name: 'Hall 2' }]
        });
        cinemaService.getOne.mockResolvedValue({
            cinema: { name: 'Test Cinema', location: 'Test Location', imageUrl: 'http://example.com/image.jpg' },
            halls: [{ id: '1', name: 'Hall 1' }]
        });
        cinemaService.addCinema.mockResolvedValue({});
        cinemaService.editCinema.mockResolvedValue({});
    });

    test('renders edit form when cinemaId is provided', async () => {
        render(
            <MemoryRouter initialEntries={['/edit-cinema/123']}>
                <Routes>
                    <Route path="/edit-cinema/:cinemaId" element={<AddEditCinemaPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByDisplayValue(/test cinema/i)).toBeInTheDocument());
        expect(screen.getByDisplayValue(/test location/i)).toBeInTheDocument();
    });
});
