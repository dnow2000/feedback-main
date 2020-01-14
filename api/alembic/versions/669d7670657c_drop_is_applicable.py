"""drop is applicable

Revision ID: 669d7670657c
Revises: fe5c6303da98
Create Date: 2020-01-14 23:16:14.095185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '669d7670657c'
down_revision = 'fe5c6303da98'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('review', 'isApplicable')
    op.drop_column('verdict', 'isApplicable')



def downgrade():
    op.add_column('review', sa.Column('isApplicable', sa.BOOLEAN(), server_default=False, nullable=True))
    op.add_column('verdict', sa.Column('isApplicable', sa.BOOLEAN(), server_default=False, nullable=True))
