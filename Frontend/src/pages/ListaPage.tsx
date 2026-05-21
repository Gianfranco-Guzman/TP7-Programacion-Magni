import { useMemo, useRef, useState } from "react";

import Filtros from "../components/Filtros";
import ParticipanteCard from "../components/ParticipanteCard";
import {
  filtrosIniciales,
  type FiltrosState,
} from "../components/filtrosConfig";
import { useParticipantes } from "../context/ParticipantesContext";
import { useAuth } from "../context/AuthContext";
import { useHotkey } from "../hooks/useHotkey";
import { useTransientFlag } from "../hooks/useTransientFlag";
import { participantesEjemplo } from "../data/datosEjemplo";

function ListaPage() {
  const { user } = useAuth();
  const { participantes, cargarDatosEjemplo } = useParticipantes();
  const [filtros, setFiltros] = useState<FiltrosState>(filtrosIniciales);
  const notificacion = useTransientFlag(2000);
  const busquedaInputRef = useRef<HTMLInputElement | null>(null);
  const esAdmin = user?.rol === "ADMIN";

  const limpiarFiltros = () => {
    setFiltros(filtrosIniciales);
  };

  const cargarDatos = async () => {
    await cargarDatosEjemplo();
    setFiltros(filtrosIniciales);
    notificacion.trigger();
    setTimeout(() => {
      const listado = document.getElementById("lista-participantes");
      if (listado) {
        listado.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 2000);
  };

  useHotkey("ctrl+b", () => {
    busquedaInputRef.current?.focus();
  });

  const datosEjemploCargados = useMemo(() => {
    if (participantes.length === 0) return false;
    const emailsEjemplo = participantesEjemplo.map((item) => item.email.toLowerCase());
    const emailsParticipantes = new Set(
      participantes.map((item) => item.email.toLowerCase()),
    );
    return emailsEjemplo.every((email) => emailsParticipantes.has(email));
  }, [participantes]);

  const participantesFiltrados = useMemo(() => {
    return participantes.filter((participante) => {
      const coincideNombre = participante.nombre
        .toLowerCase()
        .includes(filtros.busqueda.toLowerCase());

      const coincideModalidad =
        filtros.modalidad === "Todas" ||
        participante.modalidad === filtros.modalidad;

      const coincideNivel =
        filtros.nivel === "Todos" || participante.nivel === filtros.nivel;

      return coincideNombre && coincideModalidad && coincideNivel;
    });
  }, [participantes, filtros]);

  return (
    <div className="space-y-6">
      {notificacion.value && (
        <div className="fixed top-4 right-4 px-4 py-3 rounded shadow-lg text-white z-50 bg-blue-500">
          Datos de prueba cargados correctamente
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Lista de participantes</h2>

        {esAdmin && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void cargarDatos()}
              disabled={datosEjemploCargados}
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cargar datos de prueba
            </button>
          </div>
        )}
      </div>

      <Filtros
        busqueda={filtros.busqueda}
        modalidad={filtros.modalidad}
        nivel={filtros.nivel}
        onCambiarFiltros={setFiltros}
        onLimpiar={limpiarFiltros}
        totalParticipantes={participantes.length}
        participantesFiltrados={participantesFiltrados.length}
        busquedaInputRef={busquedaInputRef}
      />

      <section id="lista-participantes">
        {participantesFiltrados.length === 0 ? (
          <div className="bg-white shadow rounded p-6 text-center text-slate-600">
            No hay participantes
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participantesFiltrados.map((participante) => (
              <ParticipanteCard
                key={participante.id}
                participante={participante}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ListaPage;
