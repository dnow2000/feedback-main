"""create feature table

Revision ID: 89c457140c19
Revises: e4e1eccb6507
Create Date: 2020-10-09 16:50:15.483858

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import expression


# revision identifiers, used by Alembic.
revision = '89c457140c19'
down_revision = 'e4e1eccb6507'
branch_labels = None
depends_on = None


def upgrade():
    feature_name = sa.Enum('WITH_VERDICT_CITATIONS',
                           'WITH_VERDICT_GRAPH',
                           'WITH_VERDICT_SHARES',
                           name='featurename')
    op.create_table('feature',
                    sa.Column('description',
                              sa.String(300),
                              nullable=False),
                    sa.Column('id',
                              sa.BigInteger(),
                              autoincrement=True,
                              primary_key=True),
                    sa.Column('isActive',
                              sa.Boolean(),
                              default=True,
                              nullable=False,
                              server_default=expression.true()),
                    sa.Column('name',
                              feature_name,
                              nullable=False,
                              unique=True))


def downgrade():
    op.drop_table('feature')
    feature_name = sa.Enum(name='featurename')
    feature_name.drop(op.get_bind())
