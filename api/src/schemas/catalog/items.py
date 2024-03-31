from pydantic import BaseModel
from typing import List
from src.schemas.adminMetadata import AdminMetadata

# class ItemOf(BaseModel):
#     id: int
#     uri: str

class Item(BaseModel):
    adminMetadata: AdminMetadata
    cdd: str
    cutter: str
    year: int
    collection: str
    shelf: str
    barcode: str

class Items_Schema(BaseModel):
  itemOf: str
  instanceOf: str
  items: List[Item]

class Items_Delete(BaseModel):
  instanceOf: str
  itemOf: str
  items: List[str]