"""alter longer string for externalThumbUrl

Revision ID: 31cc2a5f0933
Revises: 5f6909210e52
Create Date: 2020-07-22 14:40:00.213468

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '31cc2a5f0933'
down_revision = '5f6909210e52'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('user',
                    'externalThumbUrl',
                    existing_type=sa.String(length=220),
                    type_=sa.String(length=512))

    op.alter_column('content', 'externalThumbUrl',
                    existing_type=sa.String(length=220),
                    type_=sa.String(length=512))

    op.alter_column('content', 'archiveUrl',
                    existing_type=sa.String(length=220),
                    type_=sa.String(length=512))


def downgrade():
    op.alter_column('user', 'externalThumbUrl',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=220))

    op.alter_column('content',
                    'externalThumbUrl',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=220))

    op.alter_column('content', 'archiveUrl',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=220))
