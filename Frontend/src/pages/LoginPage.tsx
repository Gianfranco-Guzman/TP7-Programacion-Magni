import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      navigate("/");
      
    } catch {
      setError("Usuario o contraseña incorrecta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow rounded p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-slate-100 rounded text-sm text-slate-600">
          <p className="font-semibold mb-2">Usuarios de prueba:</p>
          <p><strong>ADMIN:</strong> admin / admin123</p>
          <p><strong>CONSULTA:</strong> consulta / consulta123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
