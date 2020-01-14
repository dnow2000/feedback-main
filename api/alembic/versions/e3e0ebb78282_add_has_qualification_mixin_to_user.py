"""add has qualification mixin to user

Revision ID: e3e0ebb78282
Revises: e54708583077
Create Date: 2018-11-21 22:48:17.161104

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e3e0ebb78282'
down_revision = 'e54708583077'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('user', sa.Column('expertise', sa.Text()))
    op.add_column('user', sa.Column('organization', sa.VARCHAR(220)))
    op.add_column('user', sa.Column('profession', sa.VARCHAR(220)))
    op.add_column('user', sa.Column('url', sa.VARCHAR(220)))



def downgrade():
    op.drop_column('user', 'expertise')
    op.drop_column('user', 'organization')
    op.drop_column('user', 'profession')
    op.drop_column('user', 'url')
