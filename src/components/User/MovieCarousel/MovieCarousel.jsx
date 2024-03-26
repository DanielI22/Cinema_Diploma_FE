import Slider from "react-slick";
import { useState, useEffect } from "react";
import styles from "./MovieCarousel.module.css"
import MovieCard from "../MovieCard/MovieCard";
import * as movieService from "../../../services/movieService";
import Spinner from "../../Spinner/Spinner";

export default function MovieCarousel() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const response = await movieService.getAll();
            setMovies(response.movies);
        }
        fetchMovies();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        draggable: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={styles.carouselContainer}>
            {movies.length ? (
                <Slider {...sliderSettings}>
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={{ ...movie }} />
                    ))}
                </Slider>
            ) : (
                <Spinner />
            )}
        </div>
    )


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.customArrowNext}`}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.customArrowPrev}`}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }
}
