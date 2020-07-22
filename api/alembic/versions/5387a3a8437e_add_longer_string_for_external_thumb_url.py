"""add_longer_string_for_external_thumb_url

Revision ID: 5387a3a8437e
Revises: 5f6909210e52
Create Date: 2020-07-22 13:47:34.350059

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5387a3a8437e'
down_revision = '5f6909210e52'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('content', 'externalThumbUrl', sa.String(512))
    op.alter_column('user', 'externalThumbUrl', sa.String(512))


def downgrade():
    op.alter_column('content', 'externalThumbUrl', sa.String(220))
    op.alter_column('user', 'externalThumbUrl', sa.String(220))
