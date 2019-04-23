"""add info to tag

Revision ID: 5f64fdd4e7bf
Revises: 7240a2c9bc68
Create Date: 2019-04-23 10:19:09.877252

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f64fdd4e7bf'
down_revision = '7240a2c9bc68'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('tag', sa.Column('text', sa.Text))


def downgrade():
    op.alter_column('tag', 'info')
