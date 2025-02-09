from sqlmodel import Session, create_engine, select

from app.crud import create_caregiver
from app.core.config import settings
from app.api.caregiver.models import Caregiver, CaregiverCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))
#engine = create_engine("postgresql+psycopg2://scott:tiger@localhost:5432/postgres"
#, pool_pre_ping=True)

# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/fastapi/full-stack-fastapi-template/issues/28
#

def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    # from sqlmodel import SQLModel

    # This works because the models are already imported and registered from app.models
    # SQLModel.metadata.create_all(engine)

    caregiver = session.exec(
        select(Caregiver).where(Caregiver.email == settings.FIRST_SUPERUSER)
    ).first()
    if not caregiver:
        Caregiver_in = CaregiverCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superCaregiver=True,
        )
        caregiver = CaregiverCreate(session=session, Caregiver_create=Caregiver_in)
