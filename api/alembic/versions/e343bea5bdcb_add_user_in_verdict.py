"""add user in verdict

Revision ID: e343bea5bdcb
Revises: c4430ff9ffbb
Create Date: 2019-01-06 00:46:44.089361

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e343bea5bdcb'
down_revision = 'c4430ff9ffbb'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('verdict', sa.Column('userId', sa.BigInteger()))

def downgrade():
    op.drop_column('verdict', 'userId')
