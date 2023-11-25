from fastapi import APIRouter
from src.db.init_db import session
from src.db.models import Catalog

def NextId():

    catalog = session.query(Catalog).order_by(Catalog.id.desc()).first()   
    if  catalog:
        id = catalog.id + 1 
        return id
    else:
        return 1

router = APIRouter()

@router.get("/next_id")
async def next_id():

    register = NextId() 

    return register