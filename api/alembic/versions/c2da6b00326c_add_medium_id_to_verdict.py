"""add medium id to verdict

Revision ID: c2da6b00326c
Revises: fa48fec93e5f
Create Date: 2020-07-11 13:42:55.805920

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c2da6b00326c'
down_revision = 'fa48fec93e5f'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('verdict',
                  sa.Column('mediumId',
                            sa.BigInteger(),
                            sa.ForeignKey('medium.id')))


def downgrade():
    op.drop_column('verdict', 'mediumId')
