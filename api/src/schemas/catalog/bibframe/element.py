from pydantic import BaseModel
from typing import Optional
    
class BfElement(BaseModel):
    value: str
    base: Optional[str] = None
    label: Optional[str] = None