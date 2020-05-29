"""add has external mixin to article user

Revision ID: e54708583077
Revises: fa8e24682add
Create Date: 2018-11-21 22:44:37.043897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e54708583077'
down_revision = 'fa8e24682add'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('article', sa.Column('externalThumbUrl', sa.VARCHAR(220)))
    op.add_column('user', sa.Column('externalThumbUrl', sa.VARCHAR(220)))

def downgrade():
    op.drop_column('article', 'externalThumbUrl')
    op.drop_column('user', 'externalThumbUrl')
