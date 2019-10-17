import bcrypt
from sqlalchemy import Binary, Column, String
from sqlalchemy_api_handler import ApiHandler

from models.utils.db import Model
from models.mixins import HasExternalThumbUrlMixin, \
                          HasQualificationMixin, \
                          HasThumbMixin, \
                          NeedsValidationMixin
from models.role import Role

class User(ApiHandler,
           Model,
           HasExternalThumbUrlMixin,
           HasQualificationMixin,
           HasThumbMixin,
           NeedsValidationMixin
          ):

    email = Column(String(120), nullable=False, unique=True)
    password = Column(Binary(60), nullable=False)

    publicName = Column(String(30))

    clearTextPassword = None

    def check_password(self, passwordToCheck):
        return bcrypt.hashpw(passwordToCheck.encode('utf-8'), self.password) == self.password

    def errors(self):
        errors = super(User, self).errors()
        if self.id is None\
           and User.query.filter_by(email=self.email).count()>0:
            errors.add_error('email', 'Un compte lié à cet email existe déjà')
        if self.publicName:
            errors.check_min_length('publicName', self.publicName, 3)
        if self.email:
            errors.check_email('email', self.email)
        if self.clearTextPassword:
            errors.check_min_length('password', self.clearTextPassword, 8)
        return errors

    def get_id(self):
        return str(self.id)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def populateFromDict(self, dct):
        super(User, self).populate_from_dict(dct)
        if dct.__contains__('password') and dct['password']:
            self.set_password(dct['password'])

    def set_password(self, newpass):
        self.clearTextPassword = newpass
        self.password = bcrypt.hashpw(newpass.encode('utf-8'),
                                      bcrypt.gensalt())

    def has_rights(self, roleType):
        return Role.query\
                   .filter((Role.userId == self.id) &
                           (Role.type == roleType))\
                   .first() is not None
