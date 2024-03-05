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
    content: str
    contentLabel: str
    type: str
    typeLabel: str
    cdd: str
    cutter: str

class Language(BaseModel):
    lang: str
    langLabel: str

class GenreForm(BaseModel):
    genreForm: str
    genreFormLabel: str

class Notes(BaseModel):
    note: str
    summary: str
    tableOfContents: str




class BfWork(BaseModel):
    adminMetadata: AdminMetadata
    work: list[Work]
    contribution: Optional[list[Contribution]] = None
    title: list[Title]
    subject: Optional[list[Element]] = None
    language: list[Language]  
    genreForm: Optional[list[GenreForm]] = None
    notes: Optional[list[Notes]] = None
    # summary: Optional[list[BfLiteal]] = None
    # tableOfContents: Optional[list[BfLiteal]] = None
    # supplementaryContent: Optional[list[Element]] = None
    # illustrativeContent: Optional[list[Element]] = None
    # intendedAudience: Optional[list[Element]] = None
    # geographicCoverage: Optional[list[Element]] = None
    isPartOf: str
    