import { useEffect, useState } from "react";
import * as movieService from '../../../services/movieService';
import * as genreService from '../../../services/genreService';
import styles from "./Movies.module.css";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../../Spinner/Spinner";
import { useTranslation } from 'react-i18next';

export default function Movies() {
    const { t } = useTranslation();
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            const response = await movieService.getAll();
            setMovies(response.movies);
            setIsLoading(false);
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await genreService.getAll();
            setGenres(response.genres);
        };
        fetchGenres();
    }, [])

    const filteredMovies = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedGenre === '' || movie.genres.some(g => g.name === selectedGenre));
    });

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder={t('searchMovies')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <select
                    value={selectedGenre}
                    onChange={(e) => { setSelectedGenre(e.target.value); setSearchQuery('') }}
                    className={styles.genreSelect}
                >
                    <option value="">{t('allGenres')}</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                </select>
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                filteredMovies.length ? (
                    <div className={styles.moviesContainer}>
                        {filteredMovies.map(movie => (
                            <div key={movie.id}>
                                <MovieCard movie={{ ...movie }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noMovies}>{t('noMovies')}</div>
                )
            )}
        </div>)
}
