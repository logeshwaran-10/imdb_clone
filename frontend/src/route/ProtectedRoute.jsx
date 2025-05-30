// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to="/notFound" />;
};

export default ProtectedRoute;
