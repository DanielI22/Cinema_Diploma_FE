export function genresToString(genres) {
    return genres.map(genre => genre.name).map(genre => capitalizeFirstLetter(genre)).join(", ");
}

export function getUserRole(decodedRoles) {
    if (!decodedRoles) {
        return 'user';
    }
    const roles = decodedRoles || [];
    const roleHierarchy = ['admin', 'operator', 'validator', 'projector'];

    // Find the highest priority role the user has
    for (const role of roleHierarchy) {
        if (roles.includes(role)) {
            return role;
        }
    }

    // Default to 'user' if no other roles are found
    return 'user';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function groupShowtimesByCinemaAndMovie (showtimes) {
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

export function isValidUUID (uuid) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(uuid);
};


