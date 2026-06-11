import mercadopago
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from app.Core.config import MP_ACCESS_TOKEN, NGROK_URL
from app.Core.security import require_authenticated


router = APIRouter(tags=["MercadoPago"])


class PreferenciaRequest(BaseModel):
    titulo: str
    precio: float
    cantidad: int = 1


@router.post("/mercadopago/crear-preferencia")
def crear_preferencia(
    datos: PreferenciaRequest,
    usuario: dict = Depends(require_authenticated),
):
    sdk = mercadopago.SDK(MP_ACCESS_TOKEN)

    preference_data = {
        "items": [
            {
                "title": datos.titulo,
                "quantity": datos.cantidad,
                "unit_price": datos.precio,
            }
        ],
        "back_urls": {
            "success": f"{NGROK_URL}/pago-exitoso",
            "failure": f"{NGROK_URL}/pago-fallido",
            "pending": f"{NGROK_URL}/pago-pendiente",
        },
        "auto_return": "approved",
    }

    resultado = sdk.preference().create(preference_data)

    if resultado["status"] not in [200, 201]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al crear la preferencia de pago",
        )

    return {"init_point": resultado["response"]["init_point"]}
