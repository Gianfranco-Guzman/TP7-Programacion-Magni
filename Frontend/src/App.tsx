import { useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import EditarPage from "./pages/EditarPage";
import FormularioPage from "./pages/FormularioPage";
import ListaPage from "./pages/ListaPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    cerrarMenu();
  };

  const obtenerClaseNavLink = ({ isActive }: { isActive: boolean }) => {
    return `px-4 py-2 rounded transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-slate-200 text-slate-800 hover:bg-slate-300"
    }`;
  };

  // Si está cargando auth, mostrar loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Cargando...</p>
      </div>
    );
  }

  // Si no está autenticado, solo mostrar login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Si está autenticado, mostrar layout normal
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="bg-white shadow rounded p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Registro de Participantes</h1>
            <p className="text-sm text-slate-600">
              Logueado como <strong>{user?.username}</strong> ({user?.rol})
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMenuAbierto((prev) => !prev)}
            className="md:hidden bg-slate-200 text-slate-800 px-3 py-2 rounded hover:bg-slate-300 transition"
            aria-label="Abrir menú"
          >
            ☰
          </button>

          <nav className="hidden md:flex gap-2 items-center">
            <NavLink to="/" className={obtenerClaseNavLink}>
              Listado
            </NavLink>

            {user?.rol === "ADMIN" && (
              <NavLink to="/nuevo" className={obtenerClaseNavLink}>
                Nuevo participante
              </NavLink>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </nav>
        </div>

        {menuAbierto && (
          <nav className="md:hidden flex flex-col gap-2 mt-4">
            <NavLink
              to="/"
              onClick={cerrarMenu}
              className={obtenerClaseNavLink}
            >
              Listado
            </NavLink>

            {user?.rol === "ADMIN" && (
              <NavLink
                to="/nuevo"
                onClick={cerrarMenu}
                className={obtenerClaseNavLink}
              >
                Nuevo participante
              </NavLink>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full text-left"
            >
              Cerrar sesión
            </button>
          </nav>
        )}
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ListaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/nuevo"
            element={
              <PrivateRoute rol="ADMIN">
                <FormularioPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar/:id"
            element={
              <PrivateRoute rol="ADMIN">
                <EditarPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;