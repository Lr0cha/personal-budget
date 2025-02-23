import { ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: ReactNode;
  isPrivate: boolean;
}

const PrivateRoute = ({ children, isPrivate }: PrivateRouteProps) => {
  const token = sessionStorage.getItem("token");

  if (isPrivate && !token) {
    return <Navigate to="/login" />;
  }

  if (!isPrivate && token) {
    return <Navigate to="/" />;
  }

  // renderiza caso tenha permissão
  return <>{children}</>;
};

export default PrivateRoute;
