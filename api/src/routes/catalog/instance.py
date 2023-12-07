from fastapi import APIRouter, HTTPException
from src.schemas.catalog.instance import BfInstance

router = APIRouter()

@router.post("/create", status_code=201)
async def create_instance(request: BfInstance): 

    # graph = MakeGraphInstance(request, id)
    return request.model_dump()