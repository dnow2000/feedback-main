"""add activityUuid to content

Revision ID: 365d6db253f8
Revises: 5093315dbbed
Create Date: 2020-10-16 08:16:15.746187

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision = '365d6db253f8'
down_revision = '5093315dbbed'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('content',
                  sa.Column('activityUuid', UUID(as_uuid=True)))


def downgrade():
    op.drop_column('content', 'activityUuid')
