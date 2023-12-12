from pydantic import BaseModel
from typing import List
from src.schemas.adminMetadata import AdminMetadata
from src.schemas.catalog.bibframe.element import Element

class Item(BaseModel):
    adminMetadata: AdminMetadata
    cdd: str
    cutter: str
    year: str
    collection: str
    shelf: str
    barcode: str

class Items_Schema(BaseModel):
  itemOf: Element
  items: List[Item]