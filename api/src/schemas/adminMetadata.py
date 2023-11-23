from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date


class Status(BaseModel):
    value: str = Field(default="n")
    label: str = Field(default="novo")

class AdminMetadata(BaseModel):
    assigner: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    descriptionModifier: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    changeDate: Optional[date] = None
    creationDate: date = Field(default=date.today())
    descriptionLanguage: str = Field(default="http://id.loc.gov/vocabulary/languages/por")
    generationProcess: str = Field(default="BiblioKeia v.1")
    generationDate: str = Field(default=datetime.now().strftime('%Y-%m-%dT%H:%M:%S'))
    status: Status = Field(default=Status(value="n", label="novo"))