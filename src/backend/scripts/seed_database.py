"""
Seeder para crear usuarios iniciales del sistema.
Crea 3 usuarios con roles diferentes:
- Andrés (admin): andres@gmail.com / password123
- Creator Genérico: creator@pmusic.com / password123  
- Moderador: moderator@pmusic.com / password123
"""

import sys
import os
from pathlib import Path # importar Path desde pathlib, no desde os.path, para compatibilidad multiplataforma 

# Agregar el directorio raíz al path, para importar módulos del backend, independientemente del directorio de ejecución 
backend_dir = Path(__file__).parent.parent # Ruta al directorio 'backend'
sys.path.insert(0, str(backend_dir)) # Convertir a cadena para insertarlo en sys.path

from sqlalchemy.orm import Session # importar Session desde sqlalchemy.orm
from database import SessionLocal # importar SessionLocal desde el módulo database
from models import User, UserRole
from auth import get_password_hash
from datetime import datetime

# Funciones auxiliares, luego usadas en el seeder
def create_users(db: Session):
    """Crea los usuarios iniciales del sistema"""
    
    print("\n Creando usuarios iniciales...")
    
    # Verificar si ya existen usuarios
    existing_users = db.query(User).count()
    if existing_users > 0:
        print(f"Ya existen {existing_users} usuarios en la base de datos")
        response = input("¿Desea eliminarlos y recrear los usuarios base? (yes/no): ")
        
        if response.lower() != "yes":
            print("Operación cancelada")
            return
        
        db.query(User).delete()
        db.commit()
        print("Usuarios existentes eliminados")
    
    users_data = [
        {
            "email": "andres@gmail.com",
            "username": "Andrés",
            "role": UserRole.ADMIN,
            "profile_picture": None
        },
        {
            "email": "creator@pmusic.com",
            "username": "P-Music Creator",
            "role": UserRole.CREATOR,
            "profile_picture": None
        },
        {
            "email": "moderator@pmusic.com",
            "username": "Moderador P-Music",
            "role": UserRole.ADMIN,
            "profile_picture": None
        }
    ]
    
    created_users = []
    
    for user_data in users_data:
        # Verificar si el usuario ya existe
        existing_user = db.query(User).filter(User.email == user_data["email"]).first()
        
        if existing_user:
            print(f"   Usuario {user_data['email']} ya existe, saltando...")
            created_users.append(existing_user)
            continue
        
        # Crear nuevo usuario
        user = User(
            email=user_data["email"],
            username=user_data["username"],
            hashed_password=get_password_hash("password123"),
            role=user_data["role"],
            profile_picture=user_data["profile_picture"],
            is_active=True
        )
        
        db.add(user)
        created_users.append(user)
        
        role_emoji = {
            UserRole.ADMIN: "👑",
            UserRole.CREATOR: "🎵",
            UserRole.USER: "👤"
        }
        
        print(f"   {role_emoji[user.role]} {user.username} ({user.email}) - {user.role.value}")
    
    db.commit()
    
    print(f"\n {len(created_users)} usuarios creados/verificados")
    return created_users

# Función para mostrar las credenciales de acceso
def display_credentials():
    """Muestra las credenciales de acceso"""
    print("\n" + "=" * 70)
    print(" CREDENCIALES DE ACCESO")
    print("=" * 70)
    print("\n Email                    |  Usuario          |  Password   |  Rol")
    print("-" * 70)
    print("andres@gmail.com           | Andrés              | password123  | ADMIN")
    print("creator@pmusic.com         | P-Music Creator     | password123  | CREATOR")
    print("moderator@pmusic.com       | Moderador P-Music   | password123  | ADMIN")
    print("=" * 70)
    print(" Los usuarios ADMIN y CREATOR pueden subir contenido sin aprobación")


def main():
    print("=" * 70)
    print("🌱 SEEDER - USUARIOS INICIALES DE P-MUSIC")
    print("=" * 70)
    
    db = SessionLocal()
    
    try:
        users = create_users(db)
        display_credentials()
        
        print("\n Seeder completado exitosamente")
        print(" Puedes agregar tus canciones y álbumes con cualquiera de estas cuentas")
        
    except Exception as e:
        print(f"\n Error durante el seeder: {e}")
        db.rollback()
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    main()