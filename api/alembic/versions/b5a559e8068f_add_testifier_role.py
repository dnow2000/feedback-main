"""add testifier role

Revision ID: b5a559e8068f
Revises: 67ebe3377259
Create Date: 2020-03-31 00:26:00.093041

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5a559e8068f'
down_revision = '67ebe3377259'
branch_labels = None
depends_on = None

previous_values = ('admin', 'editor', 'guest', 'reviewer')
new_values = ('admin', 'editor', 'guest', 'reviewer', 'testifier')

previous_enum = sa.Enum(*previous_values, name='roletype')
new_enum = sa.Enum(*new_values, name='roletype')
temporary_enum = sa.Enum(*new_values, name='tmp_roletype')


def upgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE appearance ALTER COLUMN name TYPE tmp_roletype'
               ' USING name::text::tmp_roletype')
    previous_enum.drop(op.get_bind(), checkfirst=False)
    new_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE appearance ALTER COLUMN name TYPE roletype'
               ' USING name::text::roletype')
    temporary_enum.drop(op.get_bind(), checkfirst=False)


def downgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE appearance ALTER COLUMN name TYPE tmp_roletype'
               ' USING name::text::tmp_roletype')
    new_enum.drop(op.get_bind(), checkfirst=False)
    previous_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE appearance ALTER COLUMN name TYPE roletype'
               ' USING name::text::roletype')
    temporary_enum.drop(op.get_bind(), checkfirst=False)
