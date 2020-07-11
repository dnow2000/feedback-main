"""add logo url to medium

Revision ID: 3dc47ee635e3
Revises: c2da6b00326c
Create Date: 2020-07-11 13:58:23.429069

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3dc47ee635e3'
down_revision = 'c2da6b00326c'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('medium',
                  sa.Column('logoUrl',
                            sa.String(512)))


def downgrade():
    sa.drop_column('medium', 'logoUrl')
