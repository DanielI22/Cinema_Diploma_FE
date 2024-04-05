import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const GenreSelect = ({ allGenres, selectedGenres, handleGenreChange, handleCreateGenre }) => {
    const animatedComponents = makeAnimated();

    const genreOptions = allGenres.map(genre => ({
        value: genre.id,
        label: genre.name
    }));

    const handleChange = (selectedOptions) => {
        handleGenreChange(selectedOptions);
    };

    return (
        <Select
            components={animatedComponents}
            isMulti
            onChange={handleChange}
            options={genreOptions}
            value={selectedGenres.map(genre => ({ value: genre.id, label: genre.name }))}
        />
    );
};

export default GenreSelect;
