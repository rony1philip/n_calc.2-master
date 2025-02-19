from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm

from app import crud
from app.api.deps import CurrentCaregiver, SessionDep, get_current_active_superCaregiver
from app.core import security
from app.core.config import settings
from app.core.security import get_password_hash
from app.models import Message, NewPassword, Token
from app.api.caregiver.models import CaregiverPublic
from app.utils import (
    generate_password_reset_token,
    generate_reset_password_email,
    send_email,
    verify_password_reset_token,
)

router = APIRouter()


@router.post("/login/access-token")
def login_access_token(
    session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    caregiver = crud.authenticate(
        session=session, email=form_data.username, password=form_data.password
    )
    if not caregiver:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not caregiver.is_active:
        raise HTTPException(status_code=400, detail="Inactive caregiver")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            caregiver.id, expires_delta=access_token_expires
        )
    )


@router.post("/login/test-token", response_model=CaregiverPublic)
def test_token(current_caregiver: CurrentCaregiver) -> Any:
    """
    Test access token
    """
    return current_caregiver


@router.post("/password-recovery/{email}")
def recover_password(email: str, session: SessionDep) -> Message:
    """
    Password Recovery
    """
    caregiver = crud.get_caregiver_by_email(session=session, email=email)

    if not caregiver:
        raise HTTPException(
            status_code=404,
            detail="The caregiver with this email does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    email_data = generate_reset_password_email(
        email_to=caregiver.email, email=email, token=password_reset_token
    )
    send_email(
        email_to=caregiver.email,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Password recovery email sent")


@router.post("/reset-password/")
def reset_password(session: SessionDep, body: NewPassword) -> Message:
    """
    Reset password
    """
    email = verify_password_reset_token(token=body.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    caregiver = crud.get_caregiver_by_email(session=session, email=email)
    if not caregiver:
        raise HTTPException(
            status_code=404,
            detail="The caregiver with this email does not exist in the system.",
        )
    elif not caregiver.is_active:
        raise HTTPException(status_code=400, detail="Inactive caregiver")
    hashed_password = get_password_hash(password=body.new_password)
    caregiver.hashed_password = hashed_password
    session.add(caregiver)
    session.commit()
    return Message(message="Password updated successfully")


@router.post(
    "/password-recovery-html-content/{email}",
    dependencies=[Depends(get_current_active_superCaregiver)],
    response_class=HTMLResponse,
)
def recover_password_html_content(email: str, session: SessionDep) -> Any:
    """
    HTML Content for Password Recovery
    """
    caregiver = crud.get_caregiver_by_email(session=session, email=email)

    if not caregiver:
        raise HTTPException(
            status_code=404,
            detail="The caregiver with this caregivername does not exist in the system.",
        )
    password_reset_token = generate_password_reset_token(email=email)
    email_data = generate_reset_password_email(
        email_to=caregiver.email, email=email, token=password_reset_token
    )

    return HTMLResponse(
        content=email_data.html_content, headers={"subject:": email_data.subject}
    )
