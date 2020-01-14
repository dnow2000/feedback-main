"""alter rating to nullable

Revision ID: fe5c6303da98
Revises: 89da5ba1dd03
Create Date: 2020-01-14 23:05:31.218831

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fe5c6303da98'
down_revision = '89da5ba1dd03'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('review', 'rating', nullable=True)
    op.alter_column('verdict', 'rating', nullable=True)


def downgrade():
    op.alter_column('review', 'rating', nullable=False)
    op.alter_column('verdict', 'rating', nullable=True)
