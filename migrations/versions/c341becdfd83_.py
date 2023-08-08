"""empty message

Revision ID: c341becdfd83
Revises: 8dd5bc988c31
Create Date: 2023-08-08 17:22:22.371658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c341becdfd83'
down_revision = '8dd5bc988c31'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=40),
               type_=sa.String(length=100),
               existing_nullable=False)
        batch_op.alter_column('category',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=50),
               existing_nullable=True)

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('title',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.String(length=40),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('title',
               existing_type=sa.String(length=40),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('category',
               existing_type=sa.String(length=50),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=40),
               existing_nullable=False)

    # ### end Alembic commands ###
