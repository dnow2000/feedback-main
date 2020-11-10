"""rename appearance to link table

Revision ID: 94bb38cf4a37
Revises: 04f018ad7776
Create Date: 2020-11-03 21:59:30.106668

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '94bb38cf4a37'
down_revision = '04f018ad7776'
branch_labels = None
depends_on = None


def upgrade():
    op.rename_table('appearance', 'link')
    op.execute('ALTER SEQUENCE appearance_id_seq RENAME TO link_id_seq')
    op.execute('ALTER INDEX appearance_pkey RENAME TO link_pkey')

    op.alter_column('link', 'quotedClaimId', new_column_name='linkedClaimId')
    op.alter_column('link', 'quotedContentId', new_column_name='linkedContentId')
    op.alter_column('link', 'quotingClaimId', new_column_name='linkingClaimId')
    op.alter_column('link', 'quotingContentId', new_column_name='linkingContentId')


def downgrade():
    op.rename_table('link', 'appearance')
    op.execute('ALTER SEQUENCE link_id_seq RENAME TO appearance_id_seq')
    op.execute('ALTER INDEX link_pkey RENAME TO appearance_pkey')

    op.alter_column('link', 'linkedClaimId', new_column_name='quotedClaimId')
    op.alter_column('link', 'linkedContentId', new_column_name='quotedContentId')
    op.alter_column('link', 'linkingClaimId', new_column_name='quotingClaimId')
    op.alter_column('link', 'linkingContentId', new_column_name='quotingContentId')
