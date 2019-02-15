""" logger """
import logging

from utils.config import LOG_LEVEL

logging.basicConfig(format='%(asctime)s %(levelname)-8s %(message)s',
                    level=LOG_LEVEL,
                    datefmt='%Y-%m-%d %H:%M:%S')


# this is so that we can have logger.debug(XXX) calls in the app
# without XXX being evaluated when not at debug level
# this allows args to logger.debug & co. to be lambdas that will
# get called when the loglevel is right
# cf. datascience/occasions, in which the data printed in
# debug calls is costly to compute.
def wrapper_logging(level, *args):
    global logging
    if logging.getLogger().isEnabledFor(level):
        evaled_args = map(lambda a: a() if callable(a) else a,
                          args)
        logging.log(level, *evaled_args)

class Logger(dict):
    def __init__(self, *args, **kwargs):
        self.__dict__ = self

logger = Logger()

logger.critical = lambda *args: wrapper_logging(logging.CRITICAL, *args)
logger.debug = lambda *args: wrapper_logging(logging.DEBUG, *args)
logger.error = lambda *args: wrapper_logging(logging.ERROR, *args)
logger.info = lambda *args: wrapper_logging(logging.INFO, *args)
logger.warning = lambda *args: wrapper_logging(logging.WARNING, *args)

def deactivate_logger(logger_type):
    setattr(logger, '_{}'.format(logger_type), getattr(logger, logger_type))
    setattr(logger, logger_type, lambda o: None)

def activate_logger(logger_type):
    setattr(logger, logger_type, getattr(logger, '_{}'.format(logger_type)))
