from pydantic import BaseModel
from typing import Optional

from src.schemas.catalog.bibframe.element import BfElement

# class ProvisionActivity(BaseModel):
#     agent: Optional[str] = None
#     date: str
#     place: str
    
# class Publication(BaseModel):
#     agent: Optional[str] = None
#     date: str
#     place: str




class ProvisionActivity(BaseModel):
    place: str
    agent: str
    date: int  