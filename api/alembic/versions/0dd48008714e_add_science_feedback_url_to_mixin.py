"""add science feedback url to mixin

Revision ID: 0dd48008714e
Revises: 4b5e335e6665
Create Date: 2020-06-08 20:38:40.924180

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0dd48008714e'
down_revision = '4b5e335e6665'
branch_labels = None
depends_on = None


TABLE_NAMES = [
    'appearance',
    'claim',
    'content',
    'medium',
    'organization',
    'review',
    'user',
    'verdict'
]


def upgrade():
    for table_name in TABLE_NAMES:
        op.add_column(table_name,
                      sa.Column('scienceFeedbackUrl',
                                sa.String(512)))

def downgrade():
    for table_name in TABLE_NAMES:
        op.drop_column(table_name, 'scienceFeedbackUrl')
