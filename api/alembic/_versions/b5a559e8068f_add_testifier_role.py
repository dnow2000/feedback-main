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

values = ('admin', 'editor', 'guest', 'reviewer', 'testifier')


def upgrade():
    role_type = sa.Enum(*values, name='roletype')
    role_type.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE role ALTER COLUMN type TYPE roletype'
               ' USING type::text::roletype')


def downgrade():
    role_type = sa.Enum(name='roletype')
    role_type.create(op.get_bind(), checkfirst=True)
    op.alter_column('role', 'type', existing_type=role_type, type_=sa.String(128))
    role_type.drop(op.get_bind(), checkfirst=False)
