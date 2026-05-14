import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type PrivateRouteProps = {
  children: React.ReactNode;
  rol?: "ADMIN" | "CONSULTA";
};

function PrivateRoute({ children, rol }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (rol && user?.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
