from typing import Literal

from sqlmodel import SQLModel


Rol = Literal["ADMIN", "CONSULTA"]


class UsuarioBase(SQLModel):
    username: str
    rol: Rol


class UsuarioCreate(UsuarioBase):
    password: str


class UsuarioRead(UsuarioBase):
    id: int


class UsuarioLogin(SQLModel):
    username: str
    password: str


class TokenResponse(SQLModel):
    access_token: str
    token_type: str = "bearer"
    user: UsuarioRead
