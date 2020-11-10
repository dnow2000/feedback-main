"""add type to content

Revision ID: 2d177c515de0
Revises: 4514d2bb0337
Create Date: 2020-09-18 13:02:44.140192

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d177c515de0'
down_revision = '4514d2bb0337'
branch_labels = None
depends_on = None


def upgrade():
    content_type = sa.Enum('ARTICLE', 'POST', 'VIDEO', name='contenttype')
    content_type.create(op.get_bind())
    op.add_column('content',
                  sa.Column('type',
                            content_type,
                            nullable=True))


def downgrade():
    content_type = sa.Enum(name='contenttype')
    content_type.drop(op.get_bind())
    sa.drop_column('content', 'type')
