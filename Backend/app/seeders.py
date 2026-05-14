"""
Script para seedear usuarios de prueba.
Ejecutar una sola vez, luego comentar/eliminar.
"""

from app.Core.unit_of_work import UnitOfWork
from app.Usuario.usuarioModel import Usuario


def seedear_usuarios():
    usuarios = [
        Usuario(username="admin", password="admin123", rol="ADMIN"),
        Usuario(username="consulta", password="consulta123", rol="CONSULTA"),
    ]

    with UnitOfWork() as uow:
        for usuario in usuarios:
            # Verificar que no exista
            existente = uow.session.query(Usuario).filter(
                Usuario.username == usuario.username
            ).first()

            if not existente:
                uow.session.add(usuario)
                print(f"✓ Usuario '{usuario.username}' creado")
            else:
                print(f"✗ Usuario '{usuario.username}' ya existe")
