"""add uuid to activity

Revision ID: 5093315dbbed
Revises: 1794d909cdc4
Create Date: 2020-10-16 08:12:48.501265

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision = '5093315dbbed'
down_revision = '1794d909cdc4'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('activity',
                  sa.Column('uuid', UUID(as_uuid=True)))


def downgrade():
    op.drop_column('activity', 'uuid')
