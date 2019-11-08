from sqlalchemy import Index, TEXT
from sqlalchemy.sql.expression import cast
from sqlalchemy.sql.functions import coalesce

from domain.keywords import create_tsvector
from models.article import Article
from models.review import Review
from models.tag import Tag
from models.user import User
from models.verdict import Verdict

def import_keywords():
    Article.__ts_vector__ = create_tsvector(
        cast(coalesce(Article.title, ''), TEXT),
        cast(coalesce(Article.summary, ''), TEXT),
    )
    Article.__table_args__ = (
        Index(
            'idx_event_fts',
            Article.__ts_vector__,
            postgresql_using='gin'
        ),
    )

    Review.__ts_vector__ = create_tsvector(
        cast(coalesce(Review.comment, ''), TEXT),
    )
    Review.__table_args__ = (
        Index(
            'idx_event_fts',
            Review.__ts_vector__,
            postgresql_using='gin'
        ),
    )

    Tag.__ts_vector__ = create_tsvector(
        cast(coalesce(Tag.text, ''), TEXT),
    )
    Tag.__table_args__ = (
        Index(
            'idx_event_fts',
            Tag.__ts_vector__,
            postgresql_using='gin'
        ),
    )

    User.__ts_vector__ = create_tsvector(
        cast(coalesce(User.email, ''), TEXT),
        cast(coalesce(User.firstName, ''), TEXT),
        cast(coalesce(User.lastName, ''), TEXT),
    )
    User.__table_args__ = (
        Index(
            'idx_event_fts',
            User.__ts_vector__,
            postgresql_using='gin'
        ),
    )

    Verdict.__ts_vector__ = create_tsvector(
        cast(coalesce(Verdict.comment, ''), TEXT),
    )
    Verdict.__table_args__ = (
        Index(
            'idx_event_fts',
            Verdict.__ts_vector__,
            postgresql_using='gin'
        ),
    )
