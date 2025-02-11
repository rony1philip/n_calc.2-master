import uuid
from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.api.patient.models import Patient, PatientCreate
from app.api.caregiver.models import Caregiver, CaregiverCreate, CaregiverUpdate


def create_caregiver(*, session: Session, caregiver_create: CaregiverCreate) -> Caregiver:
    db_obj = Caregiver.model_validate(
        caregiver_create, update={"hashed_password": get_password_hash(caregiver_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_caregiver(*, session: Session, db_caregiver: Caregiver, caregiver_in: CaregiverUpdate) -> Any:
    caregiver_data = caregiver_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in caregiver_data:
        password = caregiver_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_caregiver.sqlmodel_update(caregiver_data, update=extra_data)
    session.add(db_caregiver)
    session.commit()
    session.refresh(db_caregiver)
    return db_caregiver


def get_caregiver_by_email(*, session: Session, email: str) -> Caregiver | None:
    statement = select(Caregiver).where(Caregiver.email == email)
    session_caregiver = session.exec(statement).first()
    return session_caregiver


def authenticate(*, session: Session, email: str, password: str) -> Caregiver | None:
    db_caregiver = get_caregiver_by_email(session=session, email=email)
    if not db_caregiver:
        return None
    if not verify_password(password, db_caregiver.hashed_password):
        return None
    return db_caregiver


def create_item(*, session: Session, item_in: PatientCreate, owner_id: uuid.UUID) -> Patient:
    db_item = Patient.model_validate(item_in, update={"owner_id": owner_id})
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item