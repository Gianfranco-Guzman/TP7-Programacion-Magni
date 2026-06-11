const API_URL = "http://localhost:8000/mercadopago";

function getHeaders(): Record<string, string> {
  const token = localStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function crearPreferencia(
  titulo: string,
  precio: number,
): Promise<string> {
  const respuesta = await fetch(`${API_URL}/crear-preferencia`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ titulo, precio, cantidad: 1 }),
  });

  if (!respuesta.ok) {
    throw new Error("Error al crear la preferencia de pago");
  }

  const datos = await respuesta.json();
  return datos.init_point as string;
}
