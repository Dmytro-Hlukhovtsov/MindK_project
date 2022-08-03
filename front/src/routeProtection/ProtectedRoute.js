import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ token, redirectPath = "/registry" }) => {
  console.log(token);
  if (!token || Object.keys(token).length === 0) {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
