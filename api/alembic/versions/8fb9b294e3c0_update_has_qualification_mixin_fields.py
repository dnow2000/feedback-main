"""update has qualification mixin fields

Revision ID: 8fb9b294e3c0
Revises: 28879213b66b
Create Date: 2019-11-08 16:16:46.514156

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fb9b294e3c0'
down_revision = '28879213b66b'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('user', sa.Column('academicWebsite', sa.String(30)))
    op.add_column('user', sa.Column('affiliation', sa.String(220)))
    op.add_column('user', sa.Column('orcidId', sa.String(30)))
    op.add_column('user', sa.Column('title', sa.String(220)))

    op.drop_column('user', 'organization')
    op.drop_column('user', 'profession')
    op.drop_column('user', 'url')


def downgrade():
    op.drop_column('user', 'academicWebsite')
    op.drop_column('user', 'affiliation')
    op.drop_column('user', 'orcidId')
    op.drop_column('user', 'title')

    op.add_column('user', sa.Column('organization', sa.String(220)))
    op.add_column('user', sa.Column('profession', sa.String(220)))
    op.add_column('user', sa.Column('url', sa.String(220)))
