"""add has graph mixin

Revision ID: 1794d909cdc4
Revises: d2aae16942c5
Create Date: 2020-10-09 23:00:40.535621

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1794d909cdc4'
down_revision = 'd2aae16942c5'
branch_labels = None
depends_on = None


TABLE_NAMES = ['claim', 'content']

def upgrade():
    for table_name in TABLE_NAMES:
        op.add_column(table_name,
                      sa.Column('anonymisedGraph', sa.JSON()))
        op.add_column(table_name,
                      sa.Column('graph', sa.JSON()))


def downgrade():
    for table_name in TABLE_NAMES:
        op.drop_column(table_name, 'anonymisedGraph')
        op.drop_column(table_name, 'graph')
