"""Edit replace id integers in all models to use UUID instead

Revision ID: d98dd8ec85a3
Revises: 9c0a54914c78
Create Date: 2024-07-19 04:08:04.000976

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = 'd98dd8ec85a3'
down_revision = '9c0a54914c78'
branch_labels = None
depends_on = None


def upgrade():
    # Ensure uuid-ossp extension is available
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    # Create a new UUID column with a default UUID value
    op.add_column('caregiver', sa.Column('new_id', postgresql.UUID(as_uuid=True), default=sa.text('uuid_generate_v4()')))
    op.add_column('patient', sa.Column('new_id', postgresql.UUID(as_uuid=True), default=sa.text('uuid_generate_v4()')))
    op.add_column('patient', sa.Column('new_owner_id', postgresql.UUID(as_uuid=True), nullable=True))

    # Populate the new columns with UUIDs
    op.execute('UPDATE "caregiver" SET new_id = uuid_generate_v4()')
    op.execute('UPDATE patient SET new_id = uuid_generate_v4()')
    op.execute('UPDATE patient SET new_owner_id = (SELECT new_id FROM "caregiver" WHERE "caregiver".id = patient.owner_id)')

    # Set the new_id as not nullable
    op.alter_column('caregiver', 'new_id', nullable=False)
    op.alter_column('patient', 'new_id', nullable=False)

    # Drop old columns and rename new columns
    op.drop_constraint('patient_owner_id_fkey', 'patient', type_='foreignkey')
    op.drop_column('patient', 'owner_id')
    op.alter_column('patient', 'new_owner_id', new_column_name='owner_id')

    op.drop_column('caregiver', 'id')
    op.alter_column('caregiver', 'new_id', new_column_name='id')

    op.drop_column('patient', 'id')
    op.alter_column('patient', 'new_id', new_column_name='id')

    # Create primary key constraint
    op.create_primary_key('caregiver_pkey', 'caregiver', ['id'])
    op.create_primary_key('patient_pkey', 'patient', ['id'])

    # Recreate foreign key constraint
    op.create_foreign_key('patient_owner_id_fkey', 'patient', 'caregiver', ['owner_id'], ['id'])

def downgrade():
    # Reverse the upgrade process
    op.add_column('caregiver', sa.Column('old_id', sa.Integer, autoincrement=True))
    op.add_column('patient', sa.Column('old_id', sa.Integer, autoincrement=True))
    op.add_column('patient', sa.Column('old_owner_id', sa.Integer, nullable=True))

    # Populate the old columns with default values
    # Generate sequences for the integer IDs if not exist
    op.execute('CREATE SEQUENCE IF NOT EXISTS caregiver_id_seq AS INTEGER OWNED BY "caregiver".old_id')
    op.execute('CREATE SEQUENCE IF NOT EXISTS patient_id_seq AS INTEGER OWNED BY patient.old_id')

    op.execute('SELECT setval(\'caregiver_id_seq\', COALESCE((SELECT MAX(old_id) + 1 FROM "caregiver"), 1), false)')
    op.execute('SELECT setval(\'patient_id_seq\', COALESCE((SELECT MAX(old_id) + 1 FROM patient), 1), false)')

    op.execute('UPDATE "caregiver" SET old_id = nextval(\'caregiver_id_seq\')')
    op.execute('UPDATE patient SET old_id = nextval(\'patient_id_seq\'), old_owner_id = (SELECT old_id FROM "caregiver" WHERE "caregiver".id = patient.owner_id)')

    # Drop new columns and rename old columns back
    op.drop_constraint('patient_owner_id_fkey', 'patient', type_='foreignkey')
    op.drop_column('patient', 'owner_id')
    op.alter_column('patient', 'old_owner_id', new_column_name='owner_id')

    op.drop_column('caregiver', 'id')
    op.alter_column('caregiver', 'old_id', new_column_name='id')

    op.drop_column('patient', 'id')
    op.alter_column('patient', 'old_id', new_column_name='id')

    # Create primary key constraint
    op.create_primary_key('caregiver_pkey', 'caregiver', ['id'])
    op.create_primary_key('patient_pkey', 'patient', ['id'])

    # Recreate foreign key constraint
    op.create_foreign_key('patient_owner_id_fkey', 'patient', 'caregiver', ['owner_id'], ['id'])
