import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import CurrentUser, SessionDep
from app.api.patient.models import Patient, PatientCreate, PatientPublic, PatientsPublic, PatientUpdate
from app.models import Message
router = APIRouter()


@router.get("/", response_model=PatientsPublic)
def read_patients(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve patients.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Patient)
        count = session.exec(count_statement).one()
        statement = select(Patient).offset(skip).limit(limit)
        patients = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Patient)
            .where(Patient.owner_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Patient)
            .where(Patient.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        patients = session.exec(statement).all()

    return PatientsPublic(data=patients, count=count)


@router.get("/{id}", response_model=PatientPublic)
def read_patient(session: SessionDep, current_user: CurrentUser, id: uuid.UUID) -> Any:
    """
    Get patient by ID.
    """
    patient = session.get(Patient, id)
    if not patient:
        raise HTTPException(status_code=404, detail="patient not found")
    if not current_user.is_superuser and (patient.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return patient


@router.post("/", response_model=PatientPublic)
def create_patient(
    *, session: SessionDep, current_user: CurrentUser, patient_in: PatientCreate
) -> Any:
    """
    Create new patient.
    """
    patient = Patient.model_validate(patient_in, update={"owner_id": current_user.id})
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return patient


@router.put("/{id}", response_model=PatientPublic)
def update_patient(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    patient_in: PatientUpdate,
) -> Any:
    """
    Update an patient.
    """
    patient = session.get(Patient, id)
    if not patient:
        raise HTTPException(status_code=404, detail="patient not found")
    if not current_user.is_superuser and (patient.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = patient_in.model_dump(exclude_unset=True)
    patient.sqlmodel_update(update_dict)
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return patient


@router.delete("/{id}")
def delete_patient(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Message:
    """
    Delete an patient.
    """
    patient = session.get(Patient, id)
    if not patient:
        raise HTTPException(status_code=404, detail="patient not found")
    if not current_user.is_superuser and (patient.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(patient)
    session.commit()
    return Message(message="Patient deleted successfully")
