import uuid
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import col, delete, func, select
from app import crud
from app.api.deps import (
    get_current_active_superCaregiver,
    SessionDep,
    get_current_Caregiver,
    CurrentCaregiver
)
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models import Message
from app.api.patient.models import Patient
from app.api.caregiver.models import Caregiver, CaregiverCreate,CaregiverPublic,CaregiverRegister, CaregiversPublic,CaregiverUpdate,CaregiverUpdateMe, UpdatePassword
from app.utils import generate_new_account_email, send_email

router = APIRouter()


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superCaregiver)],
    response_model=CaregiversPublic,
)
def read_caregivers(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve caregivers.
    """

    count_statement = select(func.count()).select_from(Caregiver)
    count = session.exec(count_statement).one()

    statement = select(Caregiver).offset(skip).limit(limit)
    caregivers = session.exec(statement).all()

    return CaregiversPublic(data=caregivers, count=count)


@router.post(
    "/", dependencies=[Depends(get_current_active_superCaregiver)], response_model=CaregiverPublic
)
def create_caregiver(*, session: SessionDep, caregiver_in: CaregiverCreate) -> Any:
    """
    Create new caregiver.
    """
    caregiver = crud.get_caregiver_by_email(session=session, email=caregiver_in.email)
    if caregiver:
        raise HTTPException(
            status_code=400,
            detail="The caregiver with this email already exists in the system.",
        )

    caregiver = crud.create_caregiver(session=session, caregiver_create=caregiver_in)
    if settings.emails_enabled and caregiver_in.email:
        email_data = generate_new_account_email(
            email_to=caregiver_in.email, caregivername=caregiver_in.email, password=caregiver_in.password
        )
        send_email(
            email_to=caregiver_in.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )
    return caregiver


@router.patch("/me", response_model=CaregiverPublic)
def update_caregiver_me(
    *, session: SessionDep, caregiver_in: CaregiverUpdateMe, current_caregiver: CurrentCaregiver
) -> Any:
    """
    Update own caregiver.
    """

    if caregiver_in.email:
        existing_caregiver = crud.get_caregiver_by_email(session=session, email=caregiver_in.email)
        if existing_caregiver and existing_caregiver.id != current_caregiver.id:
            raise HTTPException(
                status_code=409, detail="caregiver with this email already exists"
            )
    caregiver_data = caregiver_in.model_dump(exclude_unset=True)
    current_caregiver.sqlmodel_update(caregiver_data)
    session.add(current_caregiver)
    session.commit()
    session.refresh(current_caregiver)
    return current_caregiver


@router.patch("/me/password", response_model=Message)
def update_password_me(
    *, session: SessionDep, body: UpdatePassword, current_caregiver: CurrentCaregiver
) -> Any:
    """
    Update own password.
    """
    if not verify_password(body.current_password, current_caregiver.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    if body.current_password == body.new_password:
        raise HTTPException(
            status_code=400, detail="New password cannot be the same as the current one"
        )
    hashed_password = get_password_hash(body.new_password)
    current_caregiver.hashed_password = hashed_password
    session.add(current_caregiver)
    session.commit()
    return Message(message="Password updated successfully")


@router.get("/me", response_model=CaregiverPublic)
def read_caregiver_me(current_caregiver: CurrentCaregiver) -> Any:
    """
    Get current caregiver.
    """
    return current_caregiver


@router.delete("/me", response_model=Message)
def delete_caregiver_me(session: SessionDep, current_caregiver: CurrentCaregiver) -> Any:
    """
    Delete own caregiver.
    """
    if current_caregiver.is_supercaregiver:
        raise HTTPException(
            status_code=403, detail="Super caregivers are not allowed to delete themselves"
        )
    statement = delete(Patient).where(col(Patient.owner_id) == current_caregiver.id)
    session.exec(statement)  # type: ignore
    session.delete(current_caregiver)
    session.commit()
    return Message(message="caregiver deleted successfully")


@router.post("/signup", response_model=CaregiverPublic)
def register_caregiver(session: SessionDep, caregiver_in: CaregiverRegister) -> Any:
    """
    Create new caregiver without the need to be logged in.
    """
    caregiver = crud.get_caregiver_by_email(session=session, email=caregiver_in.email)
    if caregiver:
        raise HTTPException(
            status_code=400,
            detail="The caregiver with this email already exists in the system",
        )
    caregiver_create = CaregiverCreate.model_validate(caregiver_in)
    caregiver = crud.create_caregiver(session=session, caregiver_create=caregiver_create)
    return caregiver


@router.get("/{caregiver_id}", response_model=CaregiverPublic)
def read_caregiver_by_id(
    caregiver_id: uuid.UUID, session: SessionDep, current_caregiver: CurrentCaregiver
) -> Any:
    """
    Get a specific caregiver by id.
    """
    caregiver = session.get(caregiver, caregiver_id)
    if caregiver == current_caregiver:
        return caregiver
    if not current_caregiver.is_supercaregiver:
        raise HTTPException(
            status_code=403,
            detail="The caregiver doesn't have enough privileges",
        )
    return caregiver


@router.patch(
    "/{caregiver_id}",
    dependencies=[Depends(get_current_active_superCaregiver)],
    response_model=CaregiverPublic,
)
def update_caregiver(
    *,
    session: SessionDep,
    caregiver_id: uuid.UUID,
    caregiver_in: CaregiverUpdate,
) -> Any:
    """
    Update a caregiver.
    """

    db_caregiver = session.get(caregiver, caregiver_id)
    if not db_caregiver:
        raise HTTPException(
            status_code=404,
            detail="The caregiver with this id does not exist in the system",
        )
    if caregiver_in.email:
        existing_caregiver = crud.get_caregiver_by_email(session=session, email=caregiver_in.email)
        if existing_caregiver and existing_patient.id != caregiver_id:
            raise HTTPException(
                status_code=409, detail="caregiver with this email already exists"
            )

    db_caregiver = crud.update_caregiver(session=session, db_caregiver=db_caregiver, caregiver_in=caregiver_in)
    return db_caregiver


@router.delete("/{caregiver_id}", dependencies=[Depends(get_current_active_superCaregiver)])
def delete_caregiver(
    session: SessionDep, current_caregiver: CurrentCaregiver, caregiver_id: uuid.UUID
) -> Message:
    """
    Delete a caregiver.
    """
    caregiver = session.get(caregiver, caregiver_id)
    if not caregiver:
        raise HTTPException(status_code=404, detail="caregiver not found")
    if caregiver == current_caregiver:
        raise HTTPException(
            status_code=403, detail="Super caregivers are not allowed to delete themselves"
        )
    statement = delete(Patient).where(col(Patient.owner_id) == caregiver_id)
    session.exec(statement)  # type: ignore
    session.delete(caregiver)
    session.commit()
    return Message(message="caregiver deleted successfully")
