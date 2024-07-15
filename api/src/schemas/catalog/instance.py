from pydantic import BaseModel
from typing import Optional
from src.schemas.catalog.work import Resource
from src.schemas.catalog.bibframe.physicalDetails import PhysicalDetails
from src.schemas.catalog.bibframe.provisionActivity import ProvisionActivity
from src.schemas.adminMetadata import AdminMetadata
from src.schemas.catalog.bibframe.element import BfElement
from src.schemas.catalog.bibframe.title import Title

class Image(BaseModel):
    cover: str

class IdentifiedBy(BaseModel):
    local: Optional[str] = None
    isbn: Optional[str] = None
    

class BfInstance(BaseModel):
    resource: list[Resource]
    adminMetadata: AdminMetadata
    identifiedBy: Optional[IdentifiedBy] = None
    title: Title
    variantTitle: Optional[list[Title]] = None
    physicalDetails: PhysicalDetails
    provisionActivity: list[ProvisionActivity]
    editionStatement: Optional[BfElement] = None
    responsibilityStatement: Optional[BfElement] = None
    note: Optional[BfElement] = None
    instanceOf: BfElement
    image: Optional[Image] = None
    
class Instance_Delete(BaseModel):
    instance: str
    instanceOf: str