"""drop type to verdict

Revision ID: b36fa81ad52e
Revises: 714cff361432
Create Date: 2020-11-06 18:41:40.885902

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b36fa81ad52e'
down_revision = '714cff361432'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('verdict', 'type')
    post_type = sa.Enum(name='posttype')
    post_type.drop(op.get_bind())


def downgrade():
    post_type = sa.Enum('ARTICLE', 'CLAIM', 'INSIGHT', 'VIDEO', name='posttype')
    post_type.create(op.get_bind())
    op.add_column('verdict',
                  sa.Column('type',
                            post_type,
                            nullable=True))
