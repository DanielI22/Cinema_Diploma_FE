import i18n from "../locales/i18n";
import { ROLES } from "./constants";

export function genresToString(genres) {
    return genres.map(genre => genre.name).map(genre => capitalizeFirstLetter(genre)).join(", ");
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getUserRole(decodedRoles) {
    if (!decodedRoles) {
        return ROLES.USER;
    }
    const roles = decodedRoles || [];
    const roleHierarchy = [ROLES.ADMIN, ROLES.OPERATOR, ROLES.VALIDATOR, ROLES.PROJECTOR];

    // Find the highest priority role the user has
    for (const role of roleHierarchy) {
        if (roles.includes(role)) {
            return role;
        }
    }

    // Default to 'user' if no other roles are found
    return ROLES.USER;
}

export function groupShowtimesByCinemaAndMovie(showtimes) {
    const groupedByCinema = showtimes.reduce((acc, curr) => {
        if (!acc[curr.cinemaName]) {
            acc[curr.cinemaName] = [];
        }
        acc[curr.cinemaName].push(curr);
        return acc;
    }, {});

    return Object.keys(groupedByCinema).map((cinemaName) => {
        const groupedByMovie = groupedByCinema[cinemaName].reduce((acc, curr) => {
            if (!acc[curr.movieName]) {
                acc[curr.movieName] = [];
            }
            acc[curr.movieName].push(curr);
            return acc;
        }, {});

        return {
            cinemaName,
            movies: Object.keys(groupedByMovie).map((movieName) => ({
                movieName,
                showtimes: groupedByMovie[movieName],
            })),
        };
    });
};

export function isValidUUID(uuid) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(uuid);
};

export function formatLocalDate(localDate) {
    return new Date(localDate).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

export function mapTicketType(type) {
    const typeMapping = {
        'normal': i18n.t('normal'),
        'reduced': i18n.t('reduced'),
    };

    return typeMapping[type] || type;
};

export function mapBookingStatus(status) {
    const statusMapping = {
        'available': i18n.t('booking.available'),
        'taken': i18n.t('booking.taken'),
        'cancelled': i18n.t('booking.cancelled'),
        'expired': i18n.t('booking.expired'),
    };

    return statusMapping[status] || status;
};

