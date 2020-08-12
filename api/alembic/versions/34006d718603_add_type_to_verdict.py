"""add_type_to_verdict

Revision ID: 34006d718603
Revises: 11b537c3987e
Create Date: 2020-08-12 07:24:25.463329

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '34006d718603'
down_revision = '11b537c3987e'
branch_labels = None
depends_on = None


def upgrade():
    post_type = sa.Enum(name='posttype')
    post_type.create(op.get_bind())
    op.add_column('verdict',
                  sa.Column('type',
                            sa.Enum(name='posttype'),
                            nullable=True))


def downgrade():
    post_type = sa.Enum(name='posttype')
    post_type.drop(op.get_bind())
    op.drop_column('verdict', 'type')
