"""add WITH_VERDICT_BACKLINKS to FeatureName

Revision ID: 50c344148532
Revises: 365d6db253f8
Create Date: 2020-10-29 14:44:31.906134

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50c344148532'
down_revision = '365d6db253f8'
branch_labels = None
depends_on = None


previous_values = ('WITH_VERDICT_CITATIONS', 'WITH_VERDICT_GRAPH', 'WITH_VERDICT_SHARES')
new_values = ('WITH_VERDICT_CITATIONS', 'WITH_VERDICT_GRAPH', 'WITH_VERDICT_SHARES', 'WITH_VERDICT_BACKLINKS')
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
