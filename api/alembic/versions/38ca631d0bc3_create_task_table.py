"""create task table

Revision ID: 38ca631d0bc3
Revises: beb1ddb21860
Create Date: 2020-11-11 13:05:50.185324

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision = '38ca631d0bc3'
down_revision = 'beb1ddb21860'
branch_labels = None
depends_on = None


def upgrade():
    task_state = sa.Enum('CREATED',
                         'FAILURE',
                         'PUBLISHED',
                         'RECEIVED',
                         'STARTED',
                         'STOPPED',
                         'SUCCESS',
                          name='taskstate')
    op.create_table('task',
                    sa.Column('args',
                              sa.JSON()),
                    sa.Column('celeryUuid',
                              UUID(as_uuid=True),
                              index=True,
                              nullable=False),
                    sa.Column('hostname',
                              sa.String(64)),
                    sa.Column('kwargs',
                              sa.JSON()),
                    sa.Column('id',
                              sa.BigInteger(),
                              autoincrement=True,
                              primary_key=True),
                    sa.Column('name',
                              sa.String(256),
                              nullable=False),
                    sa.Column('queue',
                              sa.String(64)),
                    sa.Column('result',
                              sa.JSON()),
                    sa.Column('state',
                              task_state,
                              nullable=False),
                    sa.Column('startTime',
                              sa.DateTime(),
                              nullable=False),
                    sa.Column('stopTime',
                              sa.DateTime()),
                    sa.Column('traceback',
                              sa.Text()))

def downgrade():
    op.drop_table('task')
    task_state = sa.Enum(name='taskstate')
    task_state.drop(op.get_bind())
