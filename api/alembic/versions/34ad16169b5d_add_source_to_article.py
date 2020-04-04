"""add source to table

Revision ID: 34ad16169b5d
Revises: b07c2ea564f3
Create Date: 2020-04-04 00:39:46.918891

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '34ad16169b5d'
down_revision = 'b07c2ea564f3'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('article', 'source', sa.Column(sa.JSON()))


def downgrade():
    op.drop_column('article', 'source')
