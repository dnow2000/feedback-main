'''alter scope type

Revision ID: fb2497c23e24
Revises: 8b9a8b66345f
Create Date: 2020-06-08 23:04:19.805407

'''
import enum
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb2497c23e24'
down_revision = '8b9a8b66345f'
branch_labels = None
depends_on = None


class ScopeType(enum.Enum):
    claim = 'claim'
    content = 'content'
    review = 'review'
    user = 'user'
    verdict = 'verdict'


previous_values = ('article', 'review', 'user', 'verdict')
new_values = ('claim', 'content', 'review', 'user', 'verdict')


previous_enum = sa.Enum(*previous_values, name='scopetype')
new_enum = sa.Enum(*new_values, name='scopetype')
temporary_enum = sa.Enum(*new_values, name='tmp_scopetype')


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
