export function genresToString(genres) {
    return genres.map(genre => genre.name).map(genre => capitalizeFirstLetter(genre)).join(", ");
}

export function getUserRole(userDetails) {
    if(!userDetails) {
        return 'user';
    }
    const roles = userDetails.roles || [];
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


  