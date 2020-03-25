from sqlalchemy_api_handler import ApiHandler, logger

from models.claim import Claim


def create_claims():
    claims = []

    claims.append(Claim(
      text='global warming is caused by solar cycle'
    ))
    
    claims.append(Claim(
      text='clem is the best parapentiste boy'
    ))

    ApiHandler.save(*claims)

    logger.info('created {} claims'.format(len(claims)))

    return claims
