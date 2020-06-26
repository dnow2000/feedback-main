"""alter url to content

Revision ID: 8b9a8b66345f
Revises: 5a2e36962210
Create Date: 2020-06-08 21:40:14.249847

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b9a8b66345f'
down_revision = '5a2e36962210'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('content',
                    'url',
                    existing_type=sa.String(length=300),
                    type_=sa.String(length=512),
                    existing_nullable=False)


def downgrade():
    op.alter_column('content',
                    'url',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=300),
                    existing_nullable=False)
