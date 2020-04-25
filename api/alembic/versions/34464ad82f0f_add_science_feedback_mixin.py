"""add science feedback mixin

Revision ID: 34464ad82f0f
Revises: b07c2ea564f3
Create Date: 2020-04-17 22:52:59.055461

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '34464ad82f0f'
down_revision = 'b07c2ea564f3'
branch_labels = None
depends_on = None


table_names = [
    'appearance',
    'article',
    'claim',  
    'review',
    'user'
]


def upgrade():
    for table_name in table_names:
        op.add_column(
            table_name,
            sa.Column('scienceFeedbackId', sa.String(32)),
        )


def downgrade():
    for table_name in table_names:
        op.drop_column(
            table_name,
            sa.Column('scienceFeedbackId'),
        )
