"""alter value nullable to evaluation

Revision ID: b07c2ea564f3
Revises: b5a559e8068f
Create Date: 2020-04-03 15:12:44.657568

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b07c2ea564f3'
down_revision = 'b5a559e8068f'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('evaluation', 'value', nullable=True)


def downgrade():
    op.execute('UPDATE evaluation SET value=999 WHERE value IS NULL')
    op.alter_column('evaluation',
        'value',
        nullable=False
    )
