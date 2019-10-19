"""alter public name to nullable

Revision ID: 6d271780a31e
Revises: 5f64fdd4e7bf
Create Date: 2019-06-28 14:01:43.769429

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d271780a31e'
down_revision = '5f64fdd4e7bf'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('user', 'publicName', nullable=True)


def downgrade():
    op.alter_column('user', 'publicName', nullable=False)
