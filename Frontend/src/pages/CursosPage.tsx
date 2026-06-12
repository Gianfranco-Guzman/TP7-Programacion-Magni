import { useState } from "react";

import { crearPreferencia } from "../api/mercadoPagoApi";

const cursos = [
  {
    id: 1,
    nombre: "Curso React",
    descripcion: "Desarrollo de interfaces modernas con React 19",
    precio: 2500,
  },
  {
    id: 2,
    nombre: "Curso DBA",
    descripcion: "Administración y optimización de bases de datos",
    precio: 4000,
  },
  {
    id: 3,
    nombre: "Curso Python",
    descripcion: "Programación backend con Python y FastAPI",
    precio: 3000,
  },
  {
    id: 4,
    nombre: "Curso Node.js",
    descripcion: "Desarrollo de APIs REST con Node.js y Express",
    precio: 2800,
  },
  {
    id: 5,
    nombre: "Curso Docker & DevOps",
    descripcion: "Contenedores, orquestación y pipelines CI/CD",
    precio: 3500,
  },
  {
    id: 6,
    nombre: "Curso TypeScript",
    descripcion: "Tipado estático y patrones avanzados en TypeScript",
    precio: 2200,
  },
];

function CursosPage() {
  const [cargando, setCargando] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePagar = async (curso: (typeof cursos)[0]) => {
    setCargando(curso.id);
    setError(null);

    try {
      const initPoint = await crearPreferencia(curso.nombre, curso.precio);
      window.location.href = initPoint;
    } catch {
      setError("No se pudo conectar con Mercado Pago. Intentá de nuevo.");
      setCargando(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cursos disponibles</h2>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="bg-white shadow rounded p-6 flex flex-col gap-4"
          >
            <div>
              <h3 className="text-lg font-semibold">{curso.nombre}</h3>
              <p className="text-slate-500 text-sm mt-1">{curso.descripcion}</p>
            </div>
            <p className="text-2xl font-bold text-slate-800">
              ${curso.precio.toLocaleString("es-AR")}
            </p>
            <button
              type="button"
              onClick={() => void handlePagar(curso)}
              disabled={cargando === curso.id}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed mt-auto"
            >
              {cargando === curso.id ? "Redirigiendo..." : "QUIERO ESTE CURSO"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CursosPage;
