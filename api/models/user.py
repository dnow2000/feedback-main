from sqlalchemy import Binary, Column, String
import bcrypt

from models.utils.db import Model
from models.manager import Manager
from models.mixins import HasExternalThumbUrlMixin, \
                          HasQualificationMixin, \
                          HasThumbMixin, \
                          NeedsValidationMixin
from models import Role

class User(Manager,
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

    def checkPassword(self, passwordToCheck):
        return bcrypt.hashpw(passwordToCheck.encode('utf-8'), self.password) == self.password

    def errors(self):
        errors = super(User, self).errors()
        if self.id is None\
           and User.query.filter_by(email=self.email).count()>0:
            errors.addError('email', 'Un compte lié à cet email existe déjà')
        if self.publicName:
            errors.checkMinLength('publicName', self.publicName, 3)
        if self.email:
            errors.checkEmail('email', self.email)
        if self.clearTextPassword:
            errors.checkMinLength('password', self.clearTextPassword, 8)
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
        super(User, self).populateFromDict(dct)
        if dct.__contains__('password') and dct['password']:
            self.setPassword(dct['password'])

    def setPassword(self, newpass):
        self.clearTextPassword = newpass
        self.password = bcrypt.hashpw(newpass.encode('utf-8'),
                                      bcrypt.gensalt())

    def hasRights(self, roleType):
        return Role.query\
                   .filter((Role.userId == self.id) &
                           (Role.type == roleType))\
                   .first() is not None
