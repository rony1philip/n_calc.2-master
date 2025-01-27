import uuid
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
from api.user.models import *
import datetime as dt
from api.patient.physical_m import PatientMenu, PatientPhysicalMeasures

class Patient(SQLModel, table=True):
    age:int
    weight:int
    gender:int
    height:float
    activity_level:int 
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    caregiver : User | None = Relationship(back_populates="patients")
    patient_menu : PatientMenu | None = Relationship(back_populates="patients")
    patient_measures : PatientPhysicalMeasures | None = Relationship(back_populates="patients")




    



