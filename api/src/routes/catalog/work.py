from fastapi import APIRouter, HTTPException

from src.schemas.catalog.bibframe.work import Work


router = APIRouter()

@router.post("/create", status_code=201)
async def create_work(request: Work): 
    return request.model_dump()
