import { useNavigate, useSearchParams } from "react-router-dom";

function PagoExitosoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("external_reference");
  const curso = ref && ref !== "null" ? ref : null;

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-white shadow rounded p-10 text-center space-y-4 max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-600">Pago aprobado</h2>
        {curso && (
          <p className="text-slate-800 font-medium">Compraste: {curso}</p>
        )}
        <p className="text-slate-600">Tu pago fue procesado correctamente.</p>
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

export default PagoExitosoPage;
