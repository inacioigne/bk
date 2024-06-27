from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from src.schemas.catalog.bibframe.title import Title
from src.schemas.adminMetadata import AdminMetadata
from src.schemas.catalog.bibframe.element import BfElement

class ResourceProperties(BaseModel):
    content: BfElement
    genreForm: Optional[BfElement] = None


class Contribution(BaseModel):
    authority: BfElement
    role: Optional[BfElement] = None

class Subject(BaseModel):
    type: BfElement
    lang: BfElement
    authority: BfElement

class Classification(BaseModel):
    cdd: str
    cutter: str

class Language(BaseModel):
    lang: BfElement

class Resource(BaseModel):
    type: BfElement

class GenreForm(BaseModel):
    genre: BfElement

class IllustrativeContent(BaseModel):
    millus: BfElement

class BfWork(BaseModel):
    adminMetadata: AdminMetadata
    resource: list[Resource]
    title: Title
    variantTitle: Optional[list[Title]] = None
    language: list[Language]
    contribution: Optional[list[Contribution]] = None
    subject: Optional[list[Subject]] = None
    classification: Classification
    note: Optional[str] = None
    summary: Optional[BfElement] = None
    tableOfContents: Optional[str] = None
    genreForm: Optional[list[GenreForm]] = None
    illustrativeContent: Optional[list[IllustrativeContent]] = None

class BfWorkEdit(BaseModel):
    resourceType: list[BfElement]
    adminMetadata: AdminMetadata
    title: Title
    variantTitle: Optional[list[Title]] = None
    language: list[BfElement]
    genreForm: list[BfElement] = None
    contribution: Optional[list[Contribution]] = None
    subject: Optional[list[Subject]] = None
    classification: Classification
    note: Optional[str] = None
    summary: Optional[BfElement] = None
    tableOfContents: Optional[str] = None
    authorityExclude: Optional[list[BfElement]] = None

    