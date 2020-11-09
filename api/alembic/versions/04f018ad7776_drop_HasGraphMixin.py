"""drop HasGraphMixin

Revision ID: 04f018ad7776
Revises: 94bb38cf4a37
Create Date: 2020-11-03 22:01:55.838339

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '04f018ad7776'
down_revision = '52abc76a7f5c'
branch_labels = None
depends_on = None



TABLE_NAMES = ['claim', 'content']

def upgrade():
    for table_name in TABLE_NAMES:
        op.drop_column(table_name, 'anonymisedGraph')
        op.drop_column(table_name, 'graph')


def downgrade():
    for table_name in TABLE_NAMES:
        op.add_column(table_name,
                      sa.Column('anonymisedGraph', sa.JSON()))
        op.add_column(table_name,
                      sa.Column('graph', sa.JSON()))
