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
    label: str

# class Element(BaseModel):
#     type: str
#     elementValue: Label 

class MadsElement(BaseModel):
    elementType: Element
    elementValue: str 
    elementLang: Element

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
    organization: Organization
    affiliationStart: Optional[str] = None
    affiliationEnd: Optional[str] = None

class Variant(BaseModel): 
    type: str
    elementList: list[Element]
    # variantLabel: str

class Status(BaseModel):
    value: str = Field(default="n")
    label: str = Field(default="novo")



class Resource(BaseModel):
    type: Element


class SchemaMads(BaseModel):
    adminMetadata: AdminMetadata 
    resource: list[Resource]
    identifiersLccn: Optional[str] = None
    identifiersLocal: Optional[str] = None    
    authoritativeLabel: BfElement
    elementList: list[MadsElement]
    # fullerName: Optional[str] = None
    # hasVariant: Optional[list[Variant]] = None
    # identifiesRWO: Optional[list[Uri]] = None
    # birthPlace: Optional[str] = None
    # birthDayDate: Optional[str] = None
    # birthMonthDate: Optional[str] = None
    # birthYearDate: Optional[str] = None
    # hasAffiliation: Optional[list[Affiliation]] = None
    # fieldOfActivity: Optional[list[Uri]] = None
    # deathPlace: Optional[str] = None
    # deathDayDate: Optional[str] = None
    # deathMonthDate: Optional[str] = None
    # deathYearDate: Optional[str] = None
    # occupation: Optional[list[Uri]] = None
    # hasCloseExternalAuthority: Optional[list[Uri]] = None
    # hasExactExternalAuthority: Optional[list[Uri]] = None
    # hasBroaderAuthority: Optional[list[Uri]] = None
    # hasNarrowerAuthority: Optional[list[Uri]] = None
    # hasReciprocalAuthority: Optional[list[Uri]] = None
    # imagem: Optional[str] = None
    # isMemberOfMADSCollection: str

    # subjectOf: Optional[list[Uri]] = None
    # contributorOf: Optional[list[Uri]] = None
    # 