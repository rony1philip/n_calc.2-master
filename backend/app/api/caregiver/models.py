from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
import uuid


# Shared properties
class CaregiverBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_supercaregiver: bool = False
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class CaregiverCreate(CaregiverBase):
    password: str = Field(min_length=8, max_length=40)


class CaregiverRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)


# Properties to receive via API on update, all are optional
class CaregiverUpdate(CaregiverBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class CaregiverUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class Caregiver(CaregiverBase, table=True):
    __tablename__ = "caregiver_table"
    __table_args__ = {'extend_existing': True} 
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    patients: list["app.api.patient.models.Patient"] = Relationship(back_populates="caregiver", cascade_delete=True)


# Properties to return via API, id is always required
class CaregiverPublic(CaregiverBase):
    id: uuid.UUID


class CaregiversPublic(SQLModel):
    data: list[CaregiverPublic]
    count: int
