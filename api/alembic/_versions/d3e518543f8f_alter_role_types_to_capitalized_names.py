"""alter role types to capitalized names

Revision ID: d3e518543f8f
Revises: dd951773fcb0
Create Date: 2020-06-26 13:18:30.713577

"""
import enum
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3e518543f8f'
down_revision = 'dd951773fcb0'
branch_labels = None
depends_on = None


class PreviousRoleType(enum.Enum):
    admin = 'admin'
    author = 'author'
    editor = 'editor'
    guest = 'guest'
    reviewer = 'reviewer'
    testifier = 'testifier'


class RoleType(enum.Enum):
    ADMIN = 'admin'
    AUTHOR = 'author'
    EDITOR = 'editor'
    GUEST = 'guest'
    REVIEWER = 'reviewer'
    TESTIFIER = 'testifier'


previous_enum = sa.Enum(PreviousRoleType, name='roletype')
new_enum = sa.Enum(RoleType, name='roletype')
temporary_enum = sa.Enum(RoleType, name='tmp_roletype')


def upgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE role ALTER COLUMN type TYPE tmp_roletype'
               ' USING type::text::tmp_roletype')
    previous_enum.drop(op.get_bind(), checkfirst=False)
    new_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE role ALTER COLUMN type TYPE roletype'
               ' USING type::text::roletype')
    temporary_enum.drop(op.get_bind(), checkfirst=False)


def downgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE role ALTER COLUMN type TYPE tmp_roletype'
               ' USING type::text::tmp_roletype')
    new_enum.drop(op.get_bind(), checkfirst=False)
    previous_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE role ALTER COLUMN type TYPE roletype'
               ' USING type::text::roletype')
    temporary_enum.drop(op.get_bind(), checkfirst=False)
