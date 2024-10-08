import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode }  from 'jwt-decode';
import { verifyAdmin } from "./services/api/admins";

const AuthAdminRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loginCookie = localStorage.getItem('login');
    if (!loginCookie)
      return navigate('/admin/login');

    const decodedJwt = jwtDecode(loginCookie)

    verifyAdmin(decodedJwt.userId, localStorage.getItem('login'))
      .then(() => {
        if ((location.pathname === '/admin/login' || location.pathname === '/admin') && loginCookie)
          return navigate('/admin/control_panel');
      })
      .catch(({ response }) => {
        if (response.status === 404 || response.status === 401)
          return navigate('/admin/login');
      });
  }, []);

  return <Outlet />;
}

export default AuthAdminRoutes;