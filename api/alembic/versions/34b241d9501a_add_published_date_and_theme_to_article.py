"""add published date and theme to article

Revision ID: 34b241d9501a
Revises: 669d7670657c
Create Date: 2020-02-07 16:33:57.499305

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '34b241d9501a'
down_revision = '669d7670657c'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('article', sa.Column('publishedDate', sa.Datetime()))
    op.add_column('article', sa.Column('theme', sa.String(140)))


def downgrade():
    op.drop_column('article', 'publishedDate')
    op.drop_column('article', 'theme')
