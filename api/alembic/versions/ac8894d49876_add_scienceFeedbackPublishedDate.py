"""add scienceFeedbackPublishedDate

Revision ID: ac8894d49876
Revises: 4b7a5a2b8c7a
Create Date: 2020-07-27 12:46:59.202952

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac8894d49876'
down_revision = '4b7a5a2b8c7a'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('appearance',
                  sa.Column('scienceFeedbackPublishedDate',
                            sa.DateTime()))
    op.add_column('claim',
                  sa.Column('scienceFeedbackPublishedDate',
                            sa.DateTime()))
    op.add_column('content',
                  sa.Column('scienceFeedbackPublishedDate',
                            sa.DateTime()))
    op.add_column('review',
                  sa.Column('scienceFeedbackPublishedDate',
                            sa.DateTime()))
    op.add_column('verdict',
                  sa.Column('scienceFeedbackPublishedDate',
                            sa.DateTime()))


def downgrade():
    op.drop_column('appearance', 'scienceFeedbackPublishedDate')
    op.drop_column('claim', 'scienceFeedbackPublishedDate')
    op.drop_column('content', 'scienceFeedbackPublishedDate')
    op.drop_column('review', 'scienceFeedbackPublishedDate')
    op.drop_column('verdict', 'scienceFeedbackPublishedDate')
