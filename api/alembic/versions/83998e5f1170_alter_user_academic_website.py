"""alter user academic website

Revision ID: 83998e5f1170
Revises: 868064337798
Create Date: 2020-02-16 15:05:04.917371

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '83998e5f1170'
down_revision = '868064337798'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('user', 'academicWebsite', sa.Column(String(220)))


def downgrade():
    op.alter_column('user', 'academicWebsite', sa.Column(String(30)))
