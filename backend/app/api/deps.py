from collections.abc import Generator
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session

from app.core import security
from app.core.config import settings
from app.core.db import engine
from app.models import TokenPayload
from app.api.caregiver.models import Caregiver

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_Caregiver(session: SessionDep, token: TokenDep) -> Caregiver:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    caregiver = session.get(Caregiver, token_data.sub)
    if not caregiver:
        raise HTTPException(status_code=404, detail="Caregiver not found")
    if not caregiver.is_active:
        raise HTTPException(status_code=400, detail="Inactive Caregiver")
    return caregiver


CurrentCaregiver = Annotated[Caregiver, Depends(get_current_Caregiver)]


def get_current_active_superCaregiver(current_Caregiver: CurrentCaregiver) -> Caregiver:
    if not current_Caregiver.is_superCaregiver:
        raise HTTPException(
            status_code=403, detail="The Caregiver doesn't have enough privileges"
        )
    return current_Caregiver
