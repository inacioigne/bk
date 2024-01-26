from pydantic import BaseModel
from typing import Optional
from src.schemas.catalog.bibframe.provisionActivity import ProvisionActivity, Publication
from src.schemas.adminMetadata import AdminMetadata
from src.schemas.catalog.bibframe.element import Element
from src.schemas.catalog.bibframe.title import Title

class Value(BaseModel):
    label: str
    type: str

class BfInstance(BaseModel):
    adminMetadata: AdminMetadata
    # identifiersLocal: str
    type: str
    media: Element
    issuance: Element
    carrier: Element
    title: Title
    publication: Publication
    copyrightDate: Optional[str] = None
    dimensions: Optional[str] = None
    extent: Optional[Value] = None
    instanceOf: Element
    provisionActivityStatement: Optional[str] = None
    responsibilityStatement: Optional[str] = None
    seriesStatement: Optional[str] = None
    image: Optional[str] = None