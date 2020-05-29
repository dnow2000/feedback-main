"""create appearance table

Revision ID: 67ebe3377259
Revises: 5277fc28c434
Create Date: 2020-03-30 23:49:45.661848

"""
import enum
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '67ebe3377259'
down_revision = '5277fc28c434'
branch_labels = None
depends_on = None


class SentimentType(enum.Enum):
    ENDORSEMENT = {
        'label': 'endorsement',
        'value': 1
    }
    NEUTRAL = {
        'label': 'neutral',
        'value': 0
    }
    REFUSAL = {
        'label': 'refusal',
        'value': -1
    }


def upgrade():
    sentiment_type = sa.Enum(SentimentType, name='sentimenttype')
    op.create_table(
        'appearance',
        sa.Column('claimId',
            sa.BigInteger(),
            sa.ForeignKey('claim.id')
        ),
        sa.Column('id',
            sa.BigInteger(),
            autoincrement=True,
            primary_key=True
        ),
        sa.Column('sentiment', sentiment_type),
        sa.Column('userId',
            sa.BigInteger(),
            sa.ForeignKey('user.id')
        )
    )


def downgrade():
    op.drop_table('appearance')
    sentiment_type = sa.Enum(name='sentimenttype')
    sentiment_type.drop(op.get_bind(), checkfirst=False)
