"""add buzzsumo id is reviewable is validated as publication to article

Revision ID: c4430ff9ffbb
Revises: afee6d12ede9
Create Date: 2018-12-07 20:19:55.060675

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import expression

# revision identifiers, used by Alembic.
revision = 'c4430ff9ffbb'
down_revision = 'afee6d12ede9'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('article', sa.Column('buzzsumoId', sa.BigInteger()))
    op.add_column('article', sa.Column('isReviewable', sa.BOOLEAN(), nullable=False, server_default=expression.false()))
    op.add_column('article', sa.Column('isValidatedAsPeerPublication', sa.BOOLEAN(), nullable=False, server_default=expression.false()))


def downgrade():
    op.drop_column('article', 'buzzsumoId')
    op.drop_column('article', 'isReviewable')
    op.drop_column('article', 'isValidatedAsPeerPublication')
