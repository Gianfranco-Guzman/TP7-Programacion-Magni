from fastapi import APIRouter, status, Depends

from app.Participante.participanteSchema import ParticipanteCreate, ParticipanteRead
from app.Participante.participanteService import ParticipanteService
from app.Core.security import require_authenticated, require_admin


router = APIRouter(tags=["Participantes"])
service = ParticipanteService()


@router.get("/participantes", response_model=list[ParticipanteRead])
def obtener_participantes(usuario: dict = Depends(require_authenticated)):      #usuario

    return service.obtener_participantes()


@router.post(
    "/participantes",
    response_model=ParticipanteRead,
    status_code=status.HTTP_201_CREATED,
)
def crear_participante(participante: ParticipanteCreate, usuario: dict = Depends(require_admin)):     #admin
 
    return service.crear_participante(participante)


@router.put("/participantes/{participante_id}", response_model=ParticipanteRead)
def actualizar_participante(participante_id: int, participante: ParticipanteCreate, usuario: dict = Depends(require_admin)):

    return service.actualizar_participante(participante_id, participante)


@router.delete("/participantes/{participante_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_participante(participante_id: int, usuario: dict = Depends(require_admin)):     #admin

    service.eliminar_participante(participante_id)
