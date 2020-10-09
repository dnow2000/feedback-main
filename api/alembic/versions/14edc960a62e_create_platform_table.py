"""create platform table

Revision ID: 14edc960a62e
Revises: 34006d718603
Create Date: 2020-08-31 14:44:12.629471

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14edc960a62e'
down_revision = '34006d718603'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('platform',
                    sa.Column('id',
                              sa.BigInteger(),
                              auto_increment=True,
                              primary_key=True),
                    sa.Column('name',
                              sa.String(128),
                              nullable=False))

    op.alter_column('content', 'url', existing_nullable=False, nullable=True)


def downgrade():
    op.drop_table('platform')
    op.alter_column('content', 'url', existing_nullable=True, nullable=False)
