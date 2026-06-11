import { useNavigate } from "react-router-dom";

function PagoPendientePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-white shadow rounded p-10 text-center space-y-4 max-w-md w-full">
        <h2 className="text-2xl font-bold text-amber-500">Pago pendiente</h2>
        <p className="text-slate-600">
          Tu pago está siendo procesado. Te avisaremos cuando se confirme.
        </p>
        <button
          type="button"
          onClick={() => navigate("/cursos")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Volver a cursos
        </button>
      </div>
    </div>
  );
}

export default PagoPendientePage;
