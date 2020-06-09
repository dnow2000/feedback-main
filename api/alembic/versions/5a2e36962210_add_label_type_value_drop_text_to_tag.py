"""add label type value drop text to tag

Revision ID: 5a2e36962210
Revises: 0dd48008714e
Create Date: 2020-06-08 21:29:10.334682

"""
import enum
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5a2e36962210'
down_revision = '0dd48008714e'
branch_labels = None
depends_on = None


class SourceName(enum.Enum):
    claim = 'claim'
    content = 'content'


class TagType(enum.Enum):
    conclusion = 'conclusion'
    detail = 'detail'
    evaluation = 'evaluation'
    issue = 'issue'
    qualification = 'qualification'


def upgrade():

    op.add_column('tag',
                  sa.Column('label',
                            sa.String(128)))
    source_name = sa.Enum(SourceName, name='sourcename')
    source_name.create(op.get_bind())
    op.add_column('scope',
                  sa.Column('source', source_name))
    tag_type = sa.Enum(TagType, name='tagtype')
    tag_type.create(op.get_bind())
    op.add_column('tag',
                  sa.Column('type',
                            tag_type))
    op.add_column('tag',
                  sa.Column('value',
                            sa.Integer()))
    op.drop_column('tag', 'text')



def downgrade():
    op.drop_column('tag', 'label')
    op.drop_column('tag', 'source')
    source_name = sa.Enum(name='sourcename')
    source_name.drop(op.get_bind(), checkfirst=True)
    op.drop_column('tag', 'type')
    tag_type = sa.Enum(name='tagtype')
    tag_type.drop(op.get_bind(), checkfirst=True)
    op.drop_column('tag', 'value')
    op.add_column('tag',
                  sa.Column('text',
                            sa.Text(),
                            unique=True))
