"""create claim table

Revision ID: 7adba0267df6
Revises: 83998e5f1170
Create Date: 2020-03-27 22:11:10.553050

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7adba0267df6'
down_revision = '83998e5f1170'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'claim',
        sa.Column('id',
            sa.BigInteger(),
            autoincrement=True,
            primary_key=True
        ),
        sa.Column('text', sa.String(50))
    )


def downgrade():
    op.drop_table('claim')
