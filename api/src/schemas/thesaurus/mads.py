from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date
from src.schemas.adminMetadata import AdminMetadata


class Label(BaseModel):
    value: str
    lang: Optional[str] = None

class Element(BaseModel):
    type: str
    elementValue: Label 

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

class AdminMetadata(BaseModel):
    assigner: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    descriptionModifier: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    changeDate: Optional[date] = None
    creationDate: date = Field(default=date.today())
    descriptionLanguage: str = Field(default="http://id.loc.gov/vocabulary/languages/por")
    descriptionConventions: str = Field(default="http://id.loc.gov/vocabulary/descriptionConventions/local")
    generationProcess: str = Field(default="BiblioKeia v.1")
    generationDate: str = Field(default=datetime.now().strftime('%Y-%m-%dT%H:%M:%S'))
    status: Status = Field(default=Status(value="n", label="novo"))


class SchemaMads(BaseModel):
    type: str 
    identifiersLccn: Optional[str] = None
    identifiersLocal: Optional[str] = None
    adminMetadata: AdminMetadata 
    authoritativeLabel: str
    elementList: list[Element]
    fullerName: Optional[str] = None
    hasVariant: Optional[list[Variant]] = None
    identifiesRWO: Optional[list[Uri]] = None
    birthPlace: Optional[str] = None
    birthDayDate: Optional[str] = None
    birthMonthDate: Optional[str] = None
    birthYearDate: Optional[str] = None
    hasAffiliation: Optional[list[Affiliation]] = None
    fieldOfActivity: Optional[list[Uri]] = None
    deathPlace: Optional[str] = None
    deathDayDate: Optional[str] = None
    deathMonthDate: Optional[str] = None
    deathYearDate: Optional[str] = None
    occupation: Optional[list[Uri]] = None
    hasCloseExternalAuthority: Optional[list[Uri]] = None
    hasExactExternalAuthority: Optional[list[Uri]] = None
    hasBroaderAuthority: Optional[list[Uri]] = None
    hasNarrowerAuthority: Optional[list[Uri]] = None
    hasReciprocalAuthority: Optional[list[Uri]] = None
    imagem: Optional[str] = None
    isMemberOfMADSCollection: str

    # subjectOf: Optional[list[Uri]] = None
    # contributorOf: Optional[list[Uri]] = None
    # 