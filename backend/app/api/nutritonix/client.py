import datetime as dt
from sqlmodel import Field, Relationship, SQLModel

class NutritionixValues(SQLModel):   
   
    
    created_at = dt.datetime.now(dt.timezone.utc)