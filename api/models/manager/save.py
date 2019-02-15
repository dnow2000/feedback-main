from sqlalchemy.exc import DataError, IntegrityError

from models.manager.errors import Errors
from models.utils.api_errors import ApiErrors
from models.utils.db import db

class Save(Errors):
    @staticmethod
    def check_and_save(*objects):
        if not objects:
            raise ValueError('Objects to save need to be passed as arguments'
                             + ' to check_and_save')

        # CUMULATE ERRORS IN ONE SINGLE API ERRORS DURING ADD TIME
        api_errors = ApiErrors()
        for obj in objects:
            obj_api_errors = obj.errors()
            if obj_api_errors.errors.keys():
                api_errors.errors.update(obj_api_errors.errors)
            else:
                db.session.add(obj)

        # CHECK BEFORE COMMIT
        if api_errors.errors.keys():
            raise api_errors

        # COMMIT
        try:
            db.session.commit()
        except DataError as de:
            api_errors.addError(*Errors.restize_data_error(de))
            raise api_errors
        except IntegrityError as ie:
            api_errors.addError(*Errors.restize_integrity_error(ie))
            raise api_errors
        except TypeError as te:
            api_errors.addError(*Errors.restize_type_error(te))
            raise api_errors
        except ValueError as ve:
            api_errors.addError(*Errors.restize_value_error(ve))
            raise api_errors

        if api_errors.errors.keys():
            raise api_errors
