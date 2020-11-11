"""add inspector role

Revision ID: d2aae16942c5
Revises: 89c457140c19
Create Date: 2020-10-09 21:49:04.816369

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2aae16942c5'
down_revision = '89c457140c19'
branch_labels = None
depends_on = None

previous_values = ('ADMIN', 'AUTHOR', 'EDITOR', 'GUEST', 'REVIEWER', 'TESTIFIER')
new_values = ('ADMIN', 'AUTHOR', 'EDITOR', 'GUEST', 'INSPECTOR', 'REVIEWER', 'TESTIFIER')
enum_name = 'roletype'
column_name = 'type'
table_name = 'role'

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
