from utils.config import IS_DEVELOPMENT

def import_routes():
    import routes.articles
    import routes.claims
    import routes.evaluations
    import routes.images
    import routes.orcid
    import routes.password
    import routes.reviews
    import routes.roles
    import routes.scrap
    import routes.sign
    import routes.tags
    import routes.trendings
    import routes.user_articles
    import routes.users
    import routes.verdicts
    import routes.verdict_users

    import routes.health
    import routes.storage

    import utils.errorhandler

    if IS_DEVELOPMENT:
        import routes.sandboxes
