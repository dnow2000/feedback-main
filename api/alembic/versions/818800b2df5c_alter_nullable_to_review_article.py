"""alter nullable to review article

Revision ID: 818800b2df5c
Revises: e3e0ebb78282
Create Date: 2018-12-06 20:56:25.938132

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '818800b2df5c'
down_revision = 'e3e0ebb78282'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('article', 'title', nullable=True)
    op.alter_column('article', 'authors', nullable=True)
    op.alter_column('article', 'tags', nullable=True)
    op.alter_column('review', 'evaluationId', nullable=True)

def downgrade():
    op.execute("UPDATE offerer SET address='' WHERE address IS NULL")
    op.alter_column('offerer', 'address', nullable=False)
