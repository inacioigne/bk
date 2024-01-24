from pydantic import BaseModel
from typing import List
from src.schemas.adminMetadata import AdminMetadata
from src.schemas.catalog.bibframe.element import Element

# class ItemOf(BaseModel):
#     id: int
#     uri: str

class Item(BaseModel):
    adminMetadata: AdminMetadata
    cdd: str
    cutter: str
    year: str
    collection: str
    shelf: str
    barcode: str

class Items_Schema(BaseModel):
  itemOf: int
  instanceOf: int
  items: List[Item]