"""alter tag types to capitalized keys

Revision ID: 88eae550c5b5
Revises: a2f0115197e6
Create Date: 2020-06-24 22:07:53.688113

"""
import enum
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '88eae550c5b5'
down_revision = 'a2f0115197e6'
branch_labels = None
depends_on = None


class PreviousTagType(enum.Enum):
    conclusion = 'conclusion'
    detail = 'detail'
    evaluation = 'evaluation'
    issue = 'issue'
    qualification = 'qualification'

class TagType(enum.Enum):
    CONCLUSION = 'conclusion'
    DETAIL = 'detail'
    EVALUATION = 'evaluation'
    ISSUE = 'issue'
    QUALIFICATION = 'qualification'

previous_enum = sa.Enum(PreviousTagType, name='tagtype')
new_enum = sa.Enum(TagType, name='tagtype')
temporary_enum = sa.Enum(TagType, name='tmp_tagtype')


def upgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE tag ALTER COLUMN type TYPE tmp_tagtype'
               ' USING type::text::tmp_tagtype')
    previous_enum.drop(op.get_bind(), checkfirst=False)
    new_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE tag ALTER COLUMN type TYPE tagtype'
               ' USING type::text::tagtype')
    temporary_enum.drop(op.get_bind(), checkfirst=False)


def downgrade():
    temporary_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE tag ALTER COLUMN type TYPE tmp_tagtype'
               ' USING type::text::tmp_tagtype')
    new_enum.drop(op.get_bind(), checkfirst=False)
    previous_enum.create(op.get_bind(), checkfirst=False)
    op.execute('ALTER TABLE tag ALTER COLUMN type TYPE tagtype'
               ' USING type::text::tagtype')
    temporary_enum.drop(op.get_bind(), checkfirst=False)
