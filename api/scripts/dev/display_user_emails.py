from models.user import User

print([u.email for u in User.query.all()])
