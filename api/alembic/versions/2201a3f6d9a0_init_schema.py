"""init schema

Revision ID: 2201a3f6d9a0
Revises:
Create Date: 2018-09-14 17:40:00.173286

"""
from pathlib import Path
import os
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2201a3f6d9a0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    sql_file_path = Path(os.path.dirname(os.path.realpath(__file__))) / 'init_schema.sql'
    with open(sql_file_path, 'r') as sql_file:
        data = sql_file.read()
    op.execute(data)


def downgrade():
    op.execute('DROP TABLE image CASCADE')
    op.execute('DROP TABLE role CASCADE')
    role_type = sa.Enum(name='roletype')
    role_type.drop(op.get_bind(), checkfirst=True)
    op.execute('DROP TABLE scope CASCADE')
    scope_type = sa.Enum(name='scopetype')
    scope_type.drop(op.get_bind(), checkfirst=True)
    op.execute('DROP TABLE appearance CASCADE')
    stance_type = sa.Enum(name='stancetype')
    stance_type.drop(op.get_bind(), checkfirst=True)
    op.execute('DROP TABLE verdict_reviewer CASCADE')
    op.execute('DROP TABLE verdict_tag CASCADE')
    op.execute('DROP TABLE verdict CASCADE')
    op.execute('DROP TABLE review_tag CASCADE')
    op.execute('DROP TABLE review CASCADE')
    op.execute('DROP TABLE claim CASCADE')
    op.execute('DROP TABLE author_content CASCADE')
    op.execute('DROP TABLE content_tag CASCADE')
    op.execute('DROP TABLE content CASCADE')
    content_type = sa.Enum(name='contenttype')
    content_type.drop(op.get_bind(), checkfirst=True)
    op.execute('DROP TABLE medium CASCADE')
    op.execute('DROP TABLE organization CASCADE')
    organization_type = sa.Enum(name='organizationtype')
    organization_type.drop(op.get_bind(), checkfirst=True)
    op.execute('DROP TABLE user_session CASCADE')
    op.execute('DROP TABLE user_tag CASCADE')
    op.execute('DROP TABLE "user" CASCADE')
    op.execute('DROP TABLE tag CASCADE')
    source_name = sa.Enum(name='sourcename')
    source_name.drop(op.get_bind(), checkfirst=True)
    tag_type = sa.Enum(name='tagtype')
    tag_type.drop(op.get_bind(), checkfirst=True)
    op.execute('DROP TABLE activity')
    op.execute('DROP TABLE transaction')
    op.execute('DROP FUNCTION audit_table(target_table regclass)')
    op.execute('DROP FUNCTION audit_table(target_table regclass, ignored_cols text[])')
    op.execute('DROP FUNCTION create_activity')
    op.execute('DROP FUNCTION jsonb_change_key_name(data jsonb, old_key text, new_key text)')
    op.execute('DROP FUNCTION jsonb_subtract(arg1 jsonb, arg2 jsonb) CASCADE')
