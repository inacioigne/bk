from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date
from src.schemas.catalog.bibframe.element import BfElement
from src.schemas.adminMetadata import AdminMetadata

class Label(BaseModel):
    value: str
    lang: Optional[str] = None

class Element(BaseModel):
    value: str
    label: Optional[str] = None

class MadsElement(BaseModel):
    elementType: Element
    elementValue: str 
    elementLang: Optional[Element] = None

class FullerName(BaseModel):
    type: str
    elementValue: Label

class Uri(BaseModel):
    uri: Optional[str] = None
    label: str
    type: Optional[str] = None
    base: Optional[str] = None
    lang: Optional[str] = None    

class Organization(BaseModel):
    uri: Optional[str] = None
    label: str
    base: Optional[str] = None 

class Affiliation(BaseModel):
    base: str
    label: str
    uri: str
    affiliationStart: Optional[str] = None
    affiliationEnd: Optional[str] = None

class Variant(BaseModel): 
    typeVariant: Element
    elementList: list[MadsElement]

class Status(BaseModel):
    value: str = Field(default="n")
    label: str = Field(default="novo")

class Resource(BaseModel):
    type: Element

class MADSCollection(BaseModel):
    collection: Element

class BirthDeath(BaseModel):
    place: Optional[str] = None
    day: Optional[str] = None
    month: Element
    year: str


class SchemaMads(BaseModel):
    adminMetadata: AdminMetadata 
    resource: list[Resource]
    identifiersLccn: Optional[str] = None
    identifiersLocal: Optional[str] = None    
    authoritativeLabel: BfElement
    fullerName: Optional[BfElement] = None
    elementList: list[MadsElement]
    hasVariant: Optional[list[Variant]] = None
    isMemberOfMADSCollection: list[MADSCollection]
    birth: Optional[BirthDeath] = None
    death: Optional[BirthDeath] = None
    hasAffiliation: Optional[list[Affiliation]] = None
    hasCloseExternalAuthority: Optional[list[Uri]] = None
    hasBroaderAuthority: Optional[list[Uri]] = None
    hasNarrowerAuthority: Optional[list[Uri]] = None
    hasReciprocalAuthority: Optional[list[Uri]] = None
    occupation: Optional[list[Uri]] = None
    fieldOfActivity: Optional[list[Uri]] = None
    identifiesRWO: Optional[list[Uri]] = None
    imagem: Optional[str] = None
    
    
    # hasExactExternalAuthority: Optional[list[Uri]] = None
    # 
    # 
    # 
    # 
    # 

    # subjectOf: Optional[list[Uri]] = None
    # contributorOf: Optional[list[Uri]] = None
    # 