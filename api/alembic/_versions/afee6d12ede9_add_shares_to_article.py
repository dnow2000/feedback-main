"""add_shares_to_article

Revision ID: afee6d12ede9
Revises: 818800b2df5c
Create Date: 2018-12-07 20:03:18.012499

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'afee6d12ede9'
down_revision = '818800b2df5c'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('article', sa.Column('facebookShares', sa.BigInteger()))
    op.add_column('article', sa.Column('redditShares', sa.BigInteger()))
    op.add_column('article', sa.Column('totalShares', sa.BigInteger()))
    op.add_column('article', sa.Column('twitterShares', sa.BigInteger()))


def downgrade():
    op.drop_column('article', 'facebookShares')
    op.drop_column('article', 'redditShares')
    op.drop_column('article', 'totalShares')
    op.drop_column('article', 'twitterShares')
