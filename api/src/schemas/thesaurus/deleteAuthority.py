from pydantic import BaseModel
from enum import Enum

class TypesAuthority(str, Enum):
    PersonalName = "PersonalName"
    Topic = "Topic"
    pending = "pending"

class SchemaDeleteAuthority(BaseModel):
    id: str
    type: TypesAuthority = TypesAuthority.PersonalName

class UriDelete(BaseModel):
    authority: str
    uri: str
    type: str