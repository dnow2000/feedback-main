"""add source name to tag

Revision ID: a2f0115197e6
Revises: fb2497c23e24
Create Date: 2020-06-24 22:12:43.433253

"""
import enum
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a2f0115197e6'
down_revision = 'fb2497c23e24'
branch_labels = None
depends_on = None


class SourceName(enum.Enum):
    CLAIM = 'claim'
    CONTENT = 'content'


new_enum = sa.Enum(SourceName,
                   name='sourcename')

def upgrade():
    op.add_column('tag',
                  sa.Column('source',
                            new_enum,
                            nullable=True))


def downgrade():
    op.drop_column('tag', 'source')
    new_enum.drop(op.get_bind(), checkfirst=False)
