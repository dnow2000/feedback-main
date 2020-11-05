"""add facebook flag, flag comment and submitted to appearance

Revision ID: c99bed4e0cb7
Revises: 714cff361432
Create Date: 2020-11-05 21:59:47.364097

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import expression


# revision identifiers, used by Alembic.
revision = 'c99bed4e0cb7'
down_revision = '714cff361432'
branch_labels = None
depends_on = None


def upgrade():
    flag_type = sa.Enum('FALSE', 'FALSE_HEADLINE', 'MISLEADING', 'MISSING_CONTEXT', 'PARTLY_FALSE', 'TRUE', name='flagtype')
    flag_type.create(op.get_bind())

    op.add_column('appearance',
                  sa.Column('facebookFlag',
                            flag_type,
                            nullable=True))

    op.add_column('appearance',
                  sa.Column('facebookFlagComment',
                            sa.String(2048),
                            nullable=True))

    op.add_column('appearance',
                  sa.Column('facebookSubmitted',
                            sa.Boolean(),
                            nullable=False,
                            server_default=expression.false()))


def downgrade():
    op.drop_column('appearance', 'facebookFlag')
    op.drop_column('appearance', 'facebookFlagComment')
    op.drop_column('appearance', 'facebookSubmitted')
    flag_type = sa.Enum(name='flagtype')
    flag_type.drop(op.get_bind())
