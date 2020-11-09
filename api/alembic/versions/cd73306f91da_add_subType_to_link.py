"""add subType to link

Revision ID: cd73306f91da
Revises: 94bb38cf4a37
Create Date: 2020-11-09 21:10:46.681297

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cd73306f91da'
down_revision = '94bb38cf4a37'
branch_labels = None
depends_on = None


def upgrade():
    link_sub_type = sa.Enum('QUOTATION', 'SHARE', name='linksubtype')
    link_sub_type.create(op.get_bind())
    op.add_column('link',
                  sa.Column('subType',
                            link_sub_type))


def downgrade():
    op.drop_column('link', 'subType')
    link_sub_type = sa.Enum(name='linksubtype')
    link_sub_type.drop(op.get_bind())
