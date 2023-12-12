from fastapi import APIRouter
from src.schemas.catalog.items import Items_Schema

router = APIRouter()

@router.post("/items", status_code=201)
async def create_items(request: Items_Schema):
    return request.model_dump()
