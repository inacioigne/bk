from fastapi import APIRouter
from src.function.catalog.item.itemNextId import ItemNextId
from src.function.catalog.work.workNextId import WorkNextId
from src.function.catalog.instance.instanceNextId import InstanceNextId



router = APIRouter()

@router.get("/work/next_id")
async def next_id():

    register = WorkNextId() 

    return register

@router.get("/instance/next_id")
async def next_id():

    register = InstanceNextId() 

    return register

@router.get("/item/next_id")
async def next_id():

    register = ItemNextId()

    return register