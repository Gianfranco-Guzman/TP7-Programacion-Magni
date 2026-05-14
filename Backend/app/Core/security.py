from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.Usuario.usuarioService import UsuarioService


security = HTTPBearer()
usuario_service = UsuarioService()


async def obtener_usuario_actual(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Validar JWT y extraer usuario del token.
    Lanza 401 si token es inválido o expirado.
    """
    token = credentials.credentials
    
    usuario = usuario_service.obtener_usuario_por_token(token)
    
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return usuario


async def require_admin(usuario: dict = Depends(obtener_usuario_actual)) -> dict:
    """
    Validar que el usuario sea ADMIN.
    Lanza 403 si no es admin.
    """
    if usuario.get("rol") != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de administrador",
        )
    
    return usuario


async def require_authenticated(usuario: dict = Depends(obtener_usuario_actual)) -> dict:
    """
    Simplemente validar que exista un usuario autenticado.
    Se usa para GET (ADMIN + CONSULTA pueden ver).
    """
    return usuario
