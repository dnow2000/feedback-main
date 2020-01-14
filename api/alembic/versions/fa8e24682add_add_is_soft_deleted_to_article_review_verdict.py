"""add is soft deleted to article review verdict

Revision ID: fa8e24682add
Revises: 2201a3f6d9a0
Create Date: 2018-09-26 21:30:09.967552

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import expression

# revision identifiers, used by Alembic.
revision = 'fa8e24682add'
down_revision = '2201a3f6d9a0'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('article', sa.Column('isSoftDeleted', sa.BOOLEAN(), nullable=False, server_default=expression.false()))
    op.add_column('review', sa.Column('isSoftDeleted', sa.BOOLEAN(), nullable=False, server_default=expression.false()))
    op.add_column('verdict', sa.Column('isSoftDeleted', sa.BOOLEAN(), nullable=False, server_default=expression.false()))


def downgrade():
    op.drop_column('article', 'isSoftDeleted')
    op.drop_column('review', 'isSoftDeleted')
    op.drop_column('verdict', 'isSoftDeleted')
