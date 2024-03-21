from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date

from src.schemas.catalog.bibframe.element import BfElement

class AdminMetadata(BaseModel):
    creationDate: datetime = None
    status: BfElement
    descriptionConventions: Optional[BfElement] = None
    identifiedBy: Optional[str] = None




