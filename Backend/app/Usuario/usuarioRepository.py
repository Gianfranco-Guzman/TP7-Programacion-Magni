from sqlmodel import select

from app.Usuario.usuarioModel import Usuario


class UsuarioRepository:
    def __init__(self, session):
        self.session = session

    def obtener_por_username(self, username: str):
        consulta = select(Usuario).where(Usuario.username == username)
        return self.session.exec(consulta).first()

    def obtener_por_id(self, usuario_id: int):
        return self.session.get(Usuario, usuario_id)

    def crear(self, usuario: Usuario):
        self.session.add(usuario)
        self.session.flush()
        self.session.refresh(usuario)
        return usuario
