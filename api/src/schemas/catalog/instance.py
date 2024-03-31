from pydantic import BaseModel
from typing import Optional
from src.schemas.catalog.bibframe.physicalDetails import PhysicalDetails
from src.schemas.catalog.bibframe.provisionActivity import ProvisionActivity
from src.schemas.adminMetadata import AdminMetadata
from src.schemas.catalog.bibframe.element import BfElement
from src.schemas.catalog.bibframe.title import Title

class Image(BaseModel):
    cover: str

class BfInstance(BaseModel):
    resourceType: list[BfElement]
    adminMetadata: AdminMetadata
    title: Title
    variantTitle: Optional[list[Title]] = None
    physicalDetails: PhysicalDetails
    provisionActivity: list[ProvisionActivity]
    editionStatement: Optional[BfElement] = None
    responsibilityStatement: BfElement
    note: Optional[list[BfElement]] = None
    instanceOf: BfElement
    image: Optional[Image] = None
    
class Instance_Delete(BaseModel):
    instance: str
    instanceOf: str