"""alter still longer string for externalThumbUrl

Revision ID: 4b7a5a2b8c7a
Revises: fc35809c2b8d
Create Date: 2020-07-25 22:00:56.663001

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4b7a5a2b8c7a'
down_revision = 'fc35809c2b8d'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('user',
                    'externalThumbUrl',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=1024))

    op.alter_column('content', 'externalThumbUrl',
                    existing_type=sa.String(length=512),
                    type_=sa.String(length=1024))


def downgrade():
    op.alter_column('user', 'externalThumbUrl',
                    existing_type=sa.String(length=1024),
                    type_=sa.String(length=512))

    op.alter_column('content',
                    'externalThumbUrl',
                    existing_type=sa.String(length=1024),
                    type_=sa.String(length=512))
