import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ token, redirectPath = "/registry" }) => {
  console.log(token);
  if (!token || Object.keys(token).length === 0) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
