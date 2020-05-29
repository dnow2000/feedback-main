"""add positivity to tag

Revision ID: 89da5ba1dd03
Revises: 8a75f2491618
Create Date: 2020-01-14 20:28:26.930491

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '89da5ba1dd03'
down_revision = '8a75f2491618'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('tag', sa.Column('positivity', sa.Integer()))


def downgrade():
    op.drop_column('tag', 'positivity')
