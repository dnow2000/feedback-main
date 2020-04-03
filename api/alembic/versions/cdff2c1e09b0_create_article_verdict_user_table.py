"""create verdict user table

Revision ID: cdff2c1e09b0
Revises: 926a8533e8be
Create Date: 2020-04-03 14:54:02.453143

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cdff2c1e09b0'
down_revision = '926a8533e8be'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('user_article',
        sa.Column('id',
            sa.BigInteger(),
            autoincrement=True,
            primary_key=True
        ),
        sa.Column('userId',
                  sa.BigInteger(),
                  sa.ForeignKey('user.id'),
                  primary_key=True),
        sa.Column('articleId',
                  sa.BigInteger(),
                  sa.ForeignKey('article.id'),
                  primary_key=True))

    op.create_table('verdict_user',
        sa.Column('id',
            sa.BigInteger(),
            autoincrement=True,
            primary_key=True
        ),
        sa.Column('verdictId',
                  sa.BigInteger(),
                  sa.ForeignKey('verdict.id'),
                  primary_key=True),
        sa.Column('userId',
                  sa.BigInteger(),
                  sa.ForeignKey('user.id'),
                  primary_key=True))


def downgrade():
    op.drop_table('user_article')
    op.drop_table('verdict_user')
