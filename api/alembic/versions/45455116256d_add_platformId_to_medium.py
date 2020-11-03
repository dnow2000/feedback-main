"""add platformId to medium

Revision ID: 45455116256d
Revises: 14edc960a62e
Create Date: 2020-08-31 18:20:29.974365

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '45455116256d'
down_revision = '14edc960a62e'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('medium',
                  sa.Column('platformId',
                            sa.BigInteger(),
                            sa.ForeignKey('platform.id')))


def downgrade():
    sa.drop_column('medium', 'platformId')
