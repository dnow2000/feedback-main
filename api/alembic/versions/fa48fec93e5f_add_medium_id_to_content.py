"""add medium id to content

Revision ID: fa48fec93e5f
Revises: 2201a3f6d9a0
Create Date: 2020-07-03 16:04:41.787158

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa48fec93e5f'
down_revision = '2201a3f6d9a0'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('content',
                  sa.Column('mediumId',
                            sa.BigInteger(),
                            sa.ForeignKey('medium.id')))


def downgrade():
    op.drop_column('content', 'mediumId')
