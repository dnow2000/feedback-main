"""add type to link

Revision ID: beb1ddb21860
Revises: cd73306f91da
Create Date: 2020-11-09 21:30:31.359093

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'beb1ddb21860'
down_revision = 'cd73306f91da'
branch_labels = None
depends_on = None


def upgrade():
    link_type = sa.Enum('APPEARANCE', 'BACKLINK', name='linktype')
    link_type.create(op.get_bind())
    op.add_column('link',
                  sa.Column('type',
                            link_type))


def downgrade():
    op.drop_column('link', 'type')
    link_type = sa.Enum(name='linktype')
    link_type.drop(op.get_bind())
