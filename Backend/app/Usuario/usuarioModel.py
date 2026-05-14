from typing import Optional

from sqlmodel import SQLModel, Field


class Usuario(SQLModel, table=True):
    __tablename__ = "usuarios_db"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    password: str
    rol: str = Field(default="CONSULTA")
