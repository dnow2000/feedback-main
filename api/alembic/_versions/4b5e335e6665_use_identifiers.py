"""use identifiers

Revision ID: 4b5e335e6665
Revises: 2201a3f6d9a0
Create Date: 2020-06-05 16:57:01.524117

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4b5e335e6665'
down_revision = '2201a3f6d9a0'
branch_labels = None
depends_on = None


SCIENCE_FEEDBACK_TABLE_NAMES = [
    'appearance',
    'claim',
    'content',
    'medium',
    'organization',
    'review',
    'user'
]

def upgrade():
    op.drop_column('claim', 'source')
    op.drop_column('content', 'source')

    op.add_column('claim',
                  sa.Column('poynterIdentifier',
                            sa.String(8)))
    op.add_column('content',
                  sa.Column('buzzsumoIdentifier',
                            sa.String(16)))

    for table_name in SCIENCE_FEEDBACK_TABLE_NAMES:
        op.alter_column(table_name,
                        'scienceFeedbackId',
                        new_column_name='scienceFeedbackIdentifier')


def downgrade():
    op.add_column('claim', sa.Column('source', sa.JSON()))
    op.add_column('content', sa.Column('source', sa.JSON()))

    op.drop_column('claim', 'poynterIdentifier')
    op.drop_column('content', 'buzzsumoIdentifier')

    for table_name in SCIENCE_FEEDBACK_TABLE_NAMES:
        op.alter_column(table_name,
                        'scienceFeedbackIdentifier',
                        new_column_name='scienceFeedbackId')
