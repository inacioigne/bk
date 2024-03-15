from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BfElement(BaseModel):
    value: str
    label: str

class ResourceProperties(BaseModel):
    content: BfElement
    genreForm: Optional[BfElement] = None

class AdminMetadata(BaseModel):
    creationDate: datetime = None
    status: BfElement
    descriptionConventions: BfElement
    identifiedBy: Optional[str] = None

class Title(BaseModel):
    mainTitle: str
    subtitle: Optional[str] = None

class Contribution(BaseModel):
    term: BfElement
    role: BfElement

class Subject(BaseModel):
    type: str
    lang: str
    term: BfElement

class Classification(BaseModel):
    cdd: str
    cutter: str

class BfWork(BaseModel):
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
    summary: Optional[str] = None
    tableOfContents: Optional[str] = None
    