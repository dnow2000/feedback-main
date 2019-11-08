"""add is soft deleted to tag

Revision ID: 8a75f2491618
Revises: 8fb9b294e3c0
Create Date: 2019-11-08 17:38:49.247711

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import expression


# revision identifiers, used by Alembic.
revision = '8a75f2491618'
down_revision = '8fb9b294e3c0'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('tag', sa.Column('isSoftDeleted', sa.BOOLEAN, nullable=False, server_default=expression.false()))


def downgrade():
    op.drop_column('tag', 'isSoftDeleted')
