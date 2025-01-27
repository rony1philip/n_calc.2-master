
from sqlmodel import Field, Relationship, SQLModel
from api.patient.models import Patient
from api.user.models import *
import datetime as dt

class PatientPhysicalMeasures(SQLModel, table=True):
    created_at = dt.datetime.now(dt.timezone.utc)
    weight:int
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