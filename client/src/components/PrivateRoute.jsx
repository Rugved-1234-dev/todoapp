
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const location = useLocation();
  const token = localStorage.getItem('token'); 

  // If there's no token, redirect to sign-in page
  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  // If there's a token, render the element
  return <Element />;
};

export default PrivateRoute;
