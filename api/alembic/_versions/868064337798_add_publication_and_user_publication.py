"""add publication and user_publication

Revision ID: 868064337798
Revises: 34b241d9501a
Create Date: 2020-02-16 13:44:42.067784

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '868064337798'
down_revision = '34b241d9501a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'publication',
        sa.Column('externalThumbUrl', sa.String(220)),
        sa.Column('id', sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column('isSoftDeleted', sa.BOOLEAN(), default=False, nullable=False),
        sa.Column('summary', sa.Text()),
        sa.Column('tags', sa.Text()),
        sa.Column('title', sa.String(140)),
        sa.Column('url', sa.String(220), nullable=False, unique=True)
    )

    op.create_table(
        'user_publication',
        sa.Column('id', sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column('publicationId', sa.BigInteger(), nullable=False),
        sa.Column('userId', sa.BigInteger(), nullable=False)
    )


def downgrade():
    op.drop_table('user_publication')
    op.drop_table('publication')
