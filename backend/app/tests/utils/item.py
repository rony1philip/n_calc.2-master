from sqlmodel import Session

from app import crud
from app.models import Patient, PatientCreate
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_item(db: Session) -> Patient:
    user = create_random_user(db)
    owner_id = patient.id
    assert owner_id is not None
    title = random_lower_string()
    description = random_lower_string()
    item_in = PatientCreate(title=title, description=description)
    return crud.create_item(session=db, item_in=item_in, owner_id=owner_id)
