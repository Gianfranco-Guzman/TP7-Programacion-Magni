import type { DatosParticipante } from "../models/Participante";

export type ParticipanteCreate = Omit<DatosParticipante, "id">;

const API_URL = "http://localhost:8000/participantes";

// Helper para obtener headers con token
function getHeaders(): Record<string, string> {
  const token = localStorage.getItem("auth_token");
  
  return {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };
}

export async function obtenerParticipantes(): Promise<DatosParticipante[]> {
  const respuesta = await fetch(API_URL, {
    headers: getHeaders(),
  });

  if (!respuesta.ok) {
    throw new Error("Error al obtener participantes");
  }

  return respuesta.json();
}

export async function crearParticipante(
  participante: ParticipanteCreate,
): Promise<DatosParticipante> {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(participante),
  });

  if (!respuesta.ok) {
    throw new Error("Error al crear participante");
  }

  return respuesta.json();
}

export async function actualizarParticipante(
  id: number,
  participante: ParticipanteCreate,
): Promise<DatosParticipante> {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(participante),
  });

  if (!respuesta.ok) {
    throw new Error("Error al actualizar participante");
  }

  return respuesta.json();
}

export async function eliminarParticipante(id: number): Promise<void> {  
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!respuesta.ok) {
    throw new Error("Error al eliminar participante");
  }
}
