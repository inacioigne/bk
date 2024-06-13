from pydantic import BaseModel
from typing import Optional

from src.schemas.catalog.bibframe.element import BfElement

class ProvisionActivity(BaseModel):
    place: BfElement
    agent: BfElement
    date: int  