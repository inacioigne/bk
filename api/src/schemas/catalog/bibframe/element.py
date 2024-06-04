from pydantic import BaseModel
from typing import Optional
    
class BfElement(BaseModel):
    value: str
    metadata: Optional[str] = None
    label: Optional[str] = None