"""create user session table

Revision ID: 0480e04f2307
Revises: 2201a3f6d9a0
Create Date: 2020-04-03 14:59:25.867623

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision = '0480e04f2307'
down_revision = '2201a3f6d9a0'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('user_session',
        sa.Column('id',
            sa.BigInteger(),
            autoincrement=True,
            primary_key=True
        ),
        sa.Column('userId',
                  sa.BigInteger(),
                  nullable=True),
        sa.Column('uuid',
                  UUID(as_uuid=True),
                  unique=True,
                  nullable=False))


def downgrade():
    op.drop_table('user_session')
