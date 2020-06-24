"""alter scope types to capitalized keys

Revision ID: dd951773fcb0
Revises: 88eae550c5b5
Create Date: 2020-06-24 22:26:23.058321

"""
import enum
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dd951773fcb0'
down_revision = '88eae550c5b5'
branch_labels = None
depends_on = None


class PreviousScopeType(enum.Enum):
    claim = 'claim'
    content = 'content'
    review = 'review'
    user = 'user'
    verdict = 'verdict'

class ScopeType(enum.Enum):
    CLAIM = 'claim'
    CONTENT = 'content'
    REVIEW = 'review'
    USER = 'user'
    VERDICT = 'verdict'

previous_enum = sa.Enum(PreviousScopeType, name='scopetype')
new_enum = sa.Enum(ScopeType, name='scopetype')
temporary_enum = sa.Enum(ScopeType, name='tmp_scopetype')


def upgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE scope ALTER COLUMN type TYPE tmp_scopetype'
               ' USING type::text::tmp_scopetype')
    previous_enum.drop(op.get_bind(), checkfirst=False)
    new_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE scope ALTER COLUMN type TYPE scopetype'
               ' USING type::text::scopetype')
    temporary_enum.drop(op.get_bind(), checkfirst=False)


def downgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE scope ALTER COLUMN type TYPE tmp_scopetype'
               ' USING type::text::tmp_scopetype')
    new_enum.drop(op.get_bind(), checkfirst=False)
    previous_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE scope ALTER COLUMN type TYPE scopetype'
               ' USING type::text::scopetype')
    temporary_enum.drop(op.get_bind(), checkfirst=False)
