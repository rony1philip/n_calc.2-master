import uuid
from pydantic import EmailStr
from sqlmodel import Field, Relationship, ForeignKey, SQLModel

from sqlalchemy.orm import mapped_column, Mapped

from sqlmodel import Field, Relationship, SQLModel
from typing import Optional


"""time = f"{str(dt.datetime.now()[2])}\{str(dt.datetime.now()[1])}\{str(dt.datetime.now()[0])}"""
from datetime import datetime
now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')


# Output:
# '2022-06-30 15:30:00'


# Properties to return via API, id is always required


# Shared properties
class PatientBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)


# Properties to receive on patient creation
class PatientCreate(PatientBase):
    pass


# Properties to receive on patient update
class PatientUpdate(PatientBase):
    title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# Database model, database table inferred from class name
class Patient(PatientBase, table=True, extend_existing=True):
    __tablename__ = "patient_table"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(max_length=255)
    age:int
    weight:int
    gender:int
    height:float
    activity_level:int 
    created_at: str = now
    weight:int
    height:float
    activity_level:int 
    caregiver_id: Optional[uuid.UUID] = Field(foreign_key="caregiver.id")
   



  
    
    """patient : Patient | None = Relationship(back_populates="patient_menu")"""

"""class PatientPhysicalMeasuresMune(SQLModel, table=True):"""
    



  
  

# Properties to return via API, id is always required
class PatientPublic(PatientBase):
    id: uuid.UUID
    owner_id: uuid.UUID


class PatientsPublic(SQLModel):
    data: list[PatientPublic]
    count: int


 




    



