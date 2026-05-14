from fastapi import APIRouter, status

from app.Usuario.usuarioSchema import UsuarioLogin, TokenResponse
from app.Usuario.usuarioService import UsuarioService


router = APIRouter(tags=["Auth"])
service = UsuarioService()


@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
def login(credenciales: UsuarioLogin):

    return service.login(credenciales.username, credenciales.password)
