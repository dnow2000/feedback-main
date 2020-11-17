"""add char limit to archive url

Revision ID: 4514d2bb0337
Revises: 32516908c7ac
Create Date: 2020-09-21 20:26:26.525766

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4514d2bb0337'
down_revision = '32516908c7ac'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('content',
                    'archiveUrl',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=2048))


def downgrade():
    op.alter_column('content',
                    'archiveUrl',
                    existing_type=sa.String(length=2048),
                    type_=sa.String(length=512))
