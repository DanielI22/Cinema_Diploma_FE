export const API_BASE_URL = "https://localhost:8443/api";
export const AUTH_TOKEN_HEADER = "authToken";
export const REFRESH_TOKEN_HEADER = "refreshToken";
export const CINEMA_HEADER = "cinema";

export const PATHS = {
    HOME: "/",
    MOVIES: "/movies",
    PROGRAM: "/program",
    BOOKING: "/booking",
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",

    SELECT_CINEMA: "/select-cinema",

    MANAGE_CINEMAS: "/manage-cinemas",
    MANAGE_HALLS: "/manage-halls",
    MANAGE_MOVIES: "/manage-movies",
    MANAGE_GENRES: "/manage-genres",
    MANAGE_SHOWTIMES: "/manage-showtimes",
    MANAGE_USERS: "/manage-users",
    MANAGE_BOOKINGS: "/manage-bookings",

    MANAGE_CINEMA: "/manage-cinema",
    MANAGE_HALL: "/manage-hall",
    MANAGE_MOVIE: "/manage-movie",
    MANAGE_MOVIE_API: "/manage-movie-api",
    MANAGE_SHOWTIME: "/manage-showtime",
    MANAGE_USER: "/manage-user",
};

export const GENERAL_ERROR = "An unexpected error occurred. Please try again later.";
export const GENERAL_ADD = "Added Successfully.";
export const GENERAL_UPDATE = "Updated Successfully.";
export const GENERAL_DELETE = "Deleted Successfully.";

export const ACCESS_TOKEN_CHECK_TIME = 1000  * 60 * 2;
export const ACCESS_TOKEN_EXPIRE = 60 * 2;

export const MAX_ROWS = 20;
export const MAX_SEATS = 20;
export const INITIAL_SEATS = 10;

export const REVIEWS_PER_PAGE = 4;

export const MAX_SEATS_BOOK = 5;
export const NORMAL_TICKET = 'normal';
export const REDUCED_TICKET = 'reduced';
export const REDUCED_PRICE = 0.2;

export const STRIPE_PK = 'pk_test_51PHnLxKYvpYr3mXZvjQiwYnmcmU45My8OgoGsk4je2db1ld8xqPctS9xBnoWA4OqC3vpbCfgGlAdh3ygb4SW5wYK006Q3Gg8ak';