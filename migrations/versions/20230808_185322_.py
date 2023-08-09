"""empty message

Revision ID: 2b497e41a1e8
Revises: c341becdfd83
Create Date: 2023-08-08 18:53:22.541099

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b497e41a1e8'
down_revision = 'c341becdfd83'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stock_quantity', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.drop_column('stock_quantity')

    # ### end Alembic commands ###
