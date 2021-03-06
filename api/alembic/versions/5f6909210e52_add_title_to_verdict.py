"""add title to verdict

Revision ID: 5f6909210e52
Revises: 3dc47ee635e3
Create Date: 2020-07-22 08:32:59.391208

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f6909210e52'
down_revision = '3dc47ee635e3'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('verdict',
                  sa.Column('title',
                            sa.String(512)))


def downgrade():
    op.drop_column('verdict', 'title')
