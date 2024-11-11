import uuid
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
from api.user.models import *
import datetime as dt

class PatientPhysicalMeasures(SQLModel, table=True):
    created_at = dt.datetime.now(dt.timezone.utc)
    age:int
    weight:int
    gender:int
    height:float
    activity_level:int 
    patient: Patient | None = Relationship(back_populates="patient_measures")

class PatientMenu(SQLModel):
    sunday = Field()
    monday = Field()
    tuesday = Field()
    wednesday = Field()
    thursday = Field()
    friday = Field()
    saturday = Field()
    patient : Patient | None = Relationship(back_populates="patient_menu")


    

class NutritionixValues(SQLModel):   
   
    
    created_at = dt.datetime.now(dt.timezone.utc)

class Patient(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    caregiver : User | None = Relationship(back_populates="patients")
    patient_menu : PatientMenu | None = Relationship(back_populates="patients")
    patient_measures : PatientPhysicalMeasures | None = Relationship(back_populates="patients")
