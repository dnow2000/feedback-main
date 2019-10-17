from sqlalchemy_api_handler import logger

def deactivate_logger(logger_type):
    setattr(logger, '_{}'.format(logger_type), getattr(logger, logger_type))
    setattr(logger, logger_type, lambda o: None)

def activate_logger(logger_type):
    setattr(logger, logger_type, getattr(logger, '_{}'.format(logger_type)))
