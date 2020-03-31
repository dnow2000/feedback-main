"""create appearance table

Revision ID: 67ebe3377259
Revises: 5277fc28c434
Create Date: 2020-03-30 23:49:45.661848

"""
from alembic import op
import sqlalchemy as sa

from models.appearance import SentimentType

# revision identifiers, used by Alembic.
revision = '67ebe3377259'
down_revision = '5277fc28c434'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'appearance',
        sa.Column('claimId',
            sa.BigInteger(),
            sa.ForeignKey('claim.claimId')
        ),
        sa.Column('id',
            sa.BigInteger(),
            autoincrement=True,
            primary_key=True
        ),
        sa.Column('sentiment', sa.Enum(SentimentType)),
        sa.Column('userId',
            sa.BigInteger(),
            sa.ForeignKey('user.userId')
        )
    )


def downgrade():
    op.drop_table('appearance')
