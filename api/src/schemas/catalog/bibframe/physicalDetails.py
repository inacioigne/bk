from src.schemas.catalog.bibframe.element import BfElement
from pydantic import BaseModel


class PhysicalDetails(BaseModel):
    carrier: BfElement
    extent: str
    issuance: BfElement
    media: BfElement