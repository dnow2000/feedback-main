"""set is reviewable to nullable in article

Revision ID: 7240a2c9bc68
Revises: e343bea5bdcb
Create Date: 2019-01-11 14:13:44.412705

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import expression


# revision identifiers, used by Alembic.
revision = '7240a2c9bc68'
down_revision = 'e343bea5bdcb'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('article',
        'isReviewable',
        existing_type=sa.BOOLEAN(),
        nullable=True)


def downgrade():
    op.alter_column('article',
        'isReviewable', 
        existing_type=sa.BOOLEAN(),
        nullable=False,
        server_default=expression.false())
