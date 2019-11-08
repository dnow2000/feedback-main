"""drop public name in first name and last name to user

Revision ID: 28879213b66b
Revises: 6d271780a31e
Create Date: 2019-10-19 10:48:24.309969

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '28879213b66b'
down_revision = '6d271780a31e'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('user', 'publicName')
    op.add_column('user', sa.Column('firstName', sa.String(30), nullable=False))
    op.add_column('user', sa.Column('lastName', sa.String(30), nullable=False))


def downgrade():
    op.add_column('user', sa.Column('publicName', sa.String(30), nullable=False))
    op.drop_column('user', 'firstName')
    op.drop_column('user', 'lastName')
