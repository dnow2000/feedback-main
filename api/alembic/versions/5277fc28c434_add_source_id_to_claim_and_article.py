"""add sourceId to claim and article

Revision ID: 5277fc28c434
Revises: 7adba0267df6
Create Date: 2020-03-27 22:08:14.900882

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5277fc28c434'
down_revision = '7adba0267df6'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'article',
        sa.Column('sourceId',
            sa.String(128)
        ),
    )
    op.add_column(
        'claim',
        sa.Column('sourceId',
            sa.String(128)
        ),
    )


def downgrade():
    op.drop_column('article', 'sourceId')
    op.drop_column('claim', 'sourceId')
