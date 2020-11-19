"""add WITH_SIGNUP and WITH_TRENDINGS to FeatureName

Revision ID: f9df898743ce
Revises: beb1ddb21860
Create Date: 2020-11-17 21:03:02.068098

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9df898743ce'
down_revision = 'beb1ddb21860'
branch_labels = None
depends_on = None


previous_values = ('WITH_VERDICT_GRAPH', 'WITH_VERDICT_QUOTATIONS', 'WITH_VERDICT_SHARES', 'WITH_VERDICT_BACKLINKS')
new_values = ('WITH_TRENDINGS', 'WITH_SIGNUP', 'WITH_VERDICT_GRAPH', 'WITH_VERDICT_QUOTATIONS', 'WITH_VERDICT_SHARES', 'WITH_VERDICT_BACKLINKS')
enum_name = 'featurename'
column_name = 'name'
table_name = 'feature'

previous_enum = sa.Enum(*previous_values, name=enum_name)
new_enum = sa.Enum(*new_values, name=enum_name)
temporary_enum = sa.Enum(*new_values, name='tmp_{}'.format(enum_name))


def upgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE {} ALTER COLUMN {} TYPE tmp_{}'
               ' USING {}::text::tmp_{}'.format(table_name, column_name, enum_name, column_name, enum_name))
    previous_enum.drop(op.get_bind(), checkfirst=False)
    new_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE {} ALTER COLUMN {} TYPE {}'
               ' USING {}::text::{}'.format(table_name, column_name, enum_name, column_name, enum_name))
    temporary_enum.drop(op.get_bind(), checkfirst=False)


def downgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE {} ALTER COLUMN {} TYPE tmp_{}'
               ' USING {}::text::tmp_{}'.format(table_name, column_name, enum_name, column_name, enum_name))
    new_enum.drop(op.get_bind(), checkfirst=False)
    previous_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE {} ALTER COLUMN {} TYPE {}'
               ' USING {}::text::{}'.format(table_name, column_name, enum_name, column_name, enum_name))
    temporary_enum.drop(op.get_bind(), checkfirst=False)
