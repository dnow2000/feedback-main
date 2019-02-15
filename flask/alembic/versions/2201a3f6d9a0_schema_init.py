"""schema init

Revision ID: 2201a3f6d9a0
Revises:
Create Date: 2018-09-14 17:40:00.173286

"""
from pathlib import Path
import os
from alembic import op


# revision identifiers, used by Alembic.
revision = '2201a3f6d9a0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    sql_file_path = Path(os.path.dirname(os.path.realpath(__file__))) / 'schema_init.sql'

    with open(sql_file_path, 'r') as sql_file:
        data = sql_file.read()
    op.execute(data)


def downgrade():
    pass
