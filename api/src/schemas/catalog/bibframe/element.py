from pydantic import BaseModel
from typing import Optional

# class Element(BaseModel):
#     type: Optional[str] = None
#     typeLabel: Optional[str] = None
#     label: str
#     uri: str
#     lang: Optional[str] = None
#     langLabel: Optional[str] = None
    
class BfElement(BaseModel):
    value: str
    metadata: Optional[str] = None
    label: Optional[str] = None