from sqlalchemy_api_handler import ApiHandler, logger

from models.argument import Argument

def create_arguments():
    logger.info('create_arguments')

    arguments_by_name = {}

    arguments_by_name["Great Barrier"] = Argument(
        comment=""
    )

    ApiHandler.save(*arguments_by_name.values())

    logger.info('created {} arguments'.format(len(arguments_by_name)))

    return arguments_by_name
