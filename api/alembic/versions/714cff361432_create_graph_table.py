"""create graph table

Revision ID: 714cff361432
Revises: 365d6db253f8
Create Date: 2020-10-28 23:04:22.946360

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import expression


# revision identifiers, used by Alembic.
revision = '714cff361432'
down_revision = '365d6db253f8'
branch_labels = None
depends_on = None

MODEL_NAMES = ['Claim', 'Content']


def upgrade():
    op.create_table('graph',
                    sa.Column('id',
                              sa.BigInteger(),
                              autoincrement=True,
                              primary_key=True),
                    sa.Column('edges',
                              sa.JSON()),
                    sa.Column('isAnonymized',
                              sa.Boolean(),
                              default=True,
                              nullable=False,
                              server_default=expression.true()),
                    sa.Column('nodes',
                              sa.JSON()),
                    *[sa.Column('{}Id'.format(model_name.lower()),
                                sa.BigInteger(),
                                sa.ForeignKey('{}.id'.format(model_name.lower())),
                                index=True) for model_name in MODEL_NAMES])


def downgrade():
    op.drop_table('graph')
