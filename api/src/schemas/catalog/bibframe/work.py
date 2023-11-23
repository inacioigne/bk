from pydantic import BaseModel
from typing import Optional
from src.schemas.adminMetadata import AdminMetadata
from src.schemas.catalog.bibframe.contribution import Contribution
from src.schemas.catalog.bibframe.element import Element
from src.schemas.catalog.bibframe.title import Title

class Classification(BaseModel):
    type: str
    classificationPortion: str
    itemPortion: Optional[str] = None
    edition: Optional[str] = None

class Work(BaseModel):
    adminMetadata: AdminMetadata
    type: list[str]
    content: list[Element]
    language: list[Element]
    title: Title
    classification: Optional[Classification] = None
    contribution: Optional[list[Contribution]] = None
    subject: Optional[list[Element]] = None
    genreForm: Optional[list[Element]] = None
    note: Optional[str] = None
    summary: Optional[str] = None
    tableOfContents: Optional[str] = None
    supplementaryContent: Optional[list[Element]] = None
    illustrativeContent: Optional[list[Element]] = None
    intendedAudience: Optional[list[Element]] = None
    geographicCoverage: Optional[list[Element]] = None
    