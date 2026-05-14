from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import HTTPException
from jose import jwt

from app.Core.unit_of_work import UnitOfWork
from app.Usuario.usuarioModel import Usuario
from app.Usuario.usuarioRepository import UsuarioRepository
from app.Usuario.usuarioSchema import UsuarioCreate


SECRET_KEY = "5e2CNQli7JlIADg50xaw4s0oIMh0FSHY"
ALGORITHM = "HS256"
ACCESS_TOKEN_TIME = 30 #MINUTOS


class UsuarioService:
    def crear_usuario(self, datos_usuario: UsuarioCreate):
        with UnitOfWork() as uow:
            repositorio = UsuarioRepository(uow.session)

            existente = repositorio.obtener_por_username(datos_usuario.username)
            if existente:
                raise HTTPException(
                    status_code=400,
                    detail="El usuario ya existe",
                )

            nuevo_usuario = Usuario(
                username=datos_usuario.username,
                password=datos_usuario.password,
                rol=datos_usuario.rol,
            )

            return repositorio.crear(nuevo_usuario)

    def login(self, username: str, password: str) -> dict:
        with UnitOfWork() as uow:
            repositorio = UsuarioRepository(uow.session)

            usuario = repositorio.obtener_por_username(username)

            if not usuario:
                raise HTTPException(
                    status_code=401,
                    detail="Usuario o contraseña incorrecta",
                )

            if usuario.password != password:     #encriptar pass con bcrypt
                raise HTTPException(
                    status_code=401,
                    detail="Usuario o contraseña incorrecta",
                )

            token = self._crear_access_token(
                data={"sub": usuario.username, "user_id": usuario.id, "rol": usuario.rol}
            )

            return {
                "access_token": token,
                "token_type": "bearer",
                "user": {
                    "id": usuario.id,
                    "username": usuario.username,
                    "rol": usuario.rol,
                },
            }

    def obtener_usuario_por_token(self, token: str) -> Optional[dict]:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            user_id: int = payload.get("user_id")
            rol: str = payload.get("rol")

            if not username:
                return None

            return {"username": username, "user_id": user_id, "rol": rol}
        except Exception:
            return None

    def _crear_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):

        to_encode = data.copy()

        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(
                minutes=ACCESS_TOKEN_TIME
            )

        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

        return encoded_jwt
