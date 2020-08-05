"""add_length_to_title

Revision ID: 11b537c3987e
Revises: ac8894d49876
Create Date: 2020-08-05 15:18:25.421435

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11b537c3987e'
down_revision = 'ac8894d49876'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('content',
                    'title',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=2048))

    op.alter_column('content',
                    'url',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=2048))

    op.alter_column('verdict',
                    'title',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=2048))


def downgrade():
    op.alter_column('content',
                    'title',
                    existing_type=sa.String(length=2048),
                    type_=sa.String(length=512))

    op.alter_column('content',
                    'url',
                    existing_type=sa.String(length=2048),
                    type_=sa.String(length=512))

    op.alter_column('verdict',
                    'title',
                    existing_type=sa.String(length=2048),
                    type_=sa.String(length=512))
