"""add_total_interactions_to_content

Revision ID: e4e1eccb6507
Revises: 2d177c515de0
Create Date: 2020-10-01 18:00:21.179085

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e4e1eccb6507'
down_revision = '2d177c515de0'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('content',
                  sa.Column('totalInteractions',
                            sa.BigInteger()))


def downgrade():
    op.drop_column('content', 'totalInteractions')
