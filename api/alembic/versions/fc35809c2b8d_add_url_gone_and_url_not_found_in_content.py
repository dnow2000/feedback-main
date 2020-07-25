"""add urlGone and urlNotFound in content

Revision ID: fc35809c2b8d
Revises: 37897e6db38a
Create Date: 2020-07-25 14:29:21.016162

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fc35809c2b8d'
down_revision = '37897e6db38a'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('content',
                  sa.Column('urlGone',
                            sa.Boolean()))
    op.add_column('content',
                  sa.Column('urlNotFound',
                            sa.Boolean()))


def downgrade():
    op.drop_column('content', 'urlGone')
    op.drop_column('content', 'urlNotFound')
