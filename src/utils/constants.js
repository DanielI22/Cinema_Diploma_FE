export const API_BASE_URL = "http://localhost:8081/api";
export const AUTH_TOKEN_HEADER = "authToken";
export const REFRESH_TOKEN_HEADER = "refreshToken";
export const PATHS = {
    HOME: "/",
    MOVIES: "/movies",
    RESERVATIONS: "/reservations",
    FAVOURITES: "/favourites",
    BOOKING: "/booking",
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",

    MANAGE_CINEMAS: "/manage-cinemas",
    MANAGE_HALLS: "/manage-halls",
    MANAGE_MOVIES: "/manage-movies",
    MANAGE_SHOWTIMES: "/manage-showtimes",
    MANAGE_USERS: "/manage-users",
    MANAGE_BOOKINGS: "/manage-bookings",
    MANAGE_TICKETS: "/manage-tickets",
};
export const GENERAL_ERROR = "An unexpected error occurred. Please try again later.";

export const ACCESS_TOKEN_CHECK_TIME = 1000 * 60 * 1;
export const ACCESS_TOKEN_EXPIRE = 60 * 2;