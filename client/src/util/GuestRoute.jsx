import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 

const GuestRoute = () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        return <Navigate to="/dashboard" />;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return <Outlet />;
};

export default GuestRoute;
