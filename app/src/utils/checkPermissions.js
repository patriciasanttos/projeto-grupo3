import { jwtDecode } from 'jwt-decode';

const permissionsList = {
    animals: 1,
    sponsorships: 2,
    adoptions: 3,
    volunteers: 4,
    admins: 5,
    all: 6
}

export default async function checkPermissions(page, navigate) {
    const loginCookie = localStorage.getItem('login');
    if (!loginCookie)
        return navigate('/admin/login');

    const decodedJwt = jwtDecode(loginCookie);

    let userHasPermission = false;
    await decodedJwt.permissions.forEach(permission => {
        if (permission.id === permissionsList.all || permissionsList[page] === permission.id)
            return userHasPermission = true;
    });

    return userHasPermission
}