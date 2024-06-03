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
    FORGOT_PASSWORD: "/forgot-password",
    RESEND_VERIFICATION: "/resend-verification",
    LOGOUT: "/logout",

    MY_PROFILE: "/my-profile",
    MY_BOOKINGS: "/my-bookings",
    MY_TICKETS: "/my-tickets",
    FAVOURITES: "/favourites",

    //admin
    MANAGE_CINEMAS: "/manage-cinemas",
    MANAGE_HALLS: "/manage-halls",
    MANAGE_MOVIES: "/manage-movies",
    MANAGE_GENRES: "/manage-genres",
    MANAGE_SHOWTIMES: "/manage-showtimes",
    MANAGE_USERS: "/manage-users",

    MANAGE_CINEMA: "/manage-cinema",
    MANAGE_HALL: "/manage-hall",
    MANAGE_MOVIE: "/manage-movie",
    MANAGE_MOVIE_API: "/manage-movie-api",
    MANAGE_SHOWTIME: "/manage-showtime",
    MANAGE_BOOKINGS: "/manage-showtime-bookings",

    //operator
    SELECT_CINEMA: "/select-cinema",
    VALIDATE_BOOKING: "/validate-booking",
    TICKET_HISTORY: "/ticket-history",

    //validator
    VALIDATE_TICKET: "/validate-ticket",
};

export const ROLES = {
    USER: "user",
    ADMIN: "admin",
    OPERATOR: "operator",
    VALIDATOR: "validator",
    PROJECTOR: "projector"
}

export const TOAST_ERROR = "error";
export const TOAST_SUCCESS = "success";
export const GENERAL_ERROR = "errors.general"
export const GENERAL_ADD = "messages.add"
export const GENERAL_UPDATE = "messages.update"
export const GENERAL_DELETE = "messages.delete"

export const ACCESS_TOKEN_EXPIRE = 60;  // 1 minute

export const MAX_ROWS = 20;
export const MAX_SEATS = 20;
export const INITIAL_SEATS = 10;

export const REVIEWS_PER_PAGE = 4;

export const MAX_SEATS_BOOK = 5;
export const NORMAL_TICKET = 'normal';
export const REDUCED_TICKET = 'reduced';
export const REDUCED_PRICE = 0.2;

export const STRIPE_PK = 'pk_test_51PHnLxKYvpYr3mXZvjQiwYnmcmU45My8OgoGsk4je2db1ld8xqPctS9xBnoWA4OqC3vpbCfgGlAdh3ygb4SW5wYK006Q3Gg8ak';

export const ITEMS_PER_PAGE_BOOKINGS = 3;
export const ITEMS_PER_PAGE_TICKETS = 5;