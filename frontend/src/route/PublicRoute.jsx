// PublicRoute.js
import { Navigate } from "react-router-dom";

const PublicRoute = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to="/login" />;
};

export default PublicRoute;
