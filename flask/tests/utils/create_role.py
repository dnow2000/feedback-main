from models.role import Role

def create_role(user, role_type):
    role = Role()
    role.type = role_type
    role.user = user

    return role
