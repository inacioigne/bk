from pydantic import BaseModel
from typing import List
from src.schemas.adminMetadata import AdminMetadata
from typing import Optional

class Item(BaseModel):
    adminMetadata: AdminMetadata
    cdd: str
    cutter: str
    year: int
    collection: str
    shelf: str
    barcode: str

class ItemEdit(BaseModel):
    adminMetadata: AdminMetadata
    cdd: str
    cutter: str
    year: int
    collection: str
    shelf: str
    barcode: str
    itemOf: Optional[str] = None

class Items_Schema(BaseModel):
  itemOf: str
  instanceOf: str
  items: List[Item]

class Items_Delete(BaseModel):
  instanceOf: str
  itemOf: str
  items: List[str]