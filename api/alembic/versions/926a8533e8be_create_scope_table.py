"""create scope table

Revision ID: 926a8533e8be
Revises: e881cf677b99
Create Date: 2020-04-03 14:35:48.492871

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '926a8533e8be'
down_revision = 'e881cf677b99'
branch_labels = None
depends_on = None


values = ('article', 'review', 'user', 'verdict')


def upgrade():
    scope_type = sa.Enum(*values, name='scopetype')
    op.create_table(
        'scope',
        sa.Column('id',
            sa.BigInteger(),
            autoincrement=True,
            primary_key=True
        ),
        sa.Column('tagId',
            sa.BigInteger(),
            sa.ForeignKey('tag.id'),
            nullable=False,
            index=True),
        sa.Column('type',
                  scope_type,
                  nullable=True))



def downgrade():
    op.drop_table('scope')
    scope_type = sa.Enum(name='scopetype')
    scope_type.drop(op.get_bind(), checkfirst=False)
