"""alter buzzsumo identifier to big integer

Revision ID: 37897e6db38a
Revises: 31cc2a5f0933
Create Date: 2020-07-24 18:12:53.703722

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '37897e6db38a'
down_revision = '31cc2a5f0933'
branch_labels = None
depends_on = None


def upgrade():
    op.execute('ALTER TABLE content ALTER COLUMN "buzzsumoIdentifier" SET DATA TYPE bigint USING ("buzzsumoIdentifier"::bigint)')


def downgrade():
    op.alter_column('content',
                    'buzzsumoIdentifier',
                    existing_type=sa.BigInteger(),
                    type_=sa.String(length=16))
