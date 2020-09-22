"""Add the type enum column to the content table.

Revision ID: 2d177c515de0
Revises: 32516908c7ac
Create Date: 2020-09-18 13:02:44.140192

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d177c515de0'
down_revision = '32516908c7ac'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('content',
                  sa.Column('type',
                            sa.Enum('ARTICLE', 'POST', 'VIDEO',
                                    name='ContentType')))


def downgrade():
    sa.drop_column('content', 'type')