def import_models():
    from models.appearance import Appearance
    from models.article import Article
    from models.article_tag import ArticleTag
    from models.author_article import AuthorArticle
    from models.author_scene import AuthorScene
    from models.claim import Claim
    from models.claim_claim import ClaimClaim
    from models.evaluation import Evaluation
    from models.image import Image
    from models.organization import Organization
    from models.publication import Publication
    from models.review import Review
    from models.review_tag import ReviewTag
    from models.reviewer_publication import ReviewerPublication
    from models.role import Role
    from models.scene import Scene
    from models.scene_tag import SceneTag
    from models.scope import Scope
    from models.tag import Tag
    from models.user import User
    from models.user_session import UserSession
    from models.user_tag import UserTag
    from models.verdict import Verdict
    from models.verdict_reviewer import VerdictReviewer
    from models.verdict_tag import VerdictTag

    return list(locals().values())
