from pyfuseki import FusekiQuery
# from src.schemas.settings import Settings
from fastapi import APIRouter, HTTPException
from src.function.thesaurus.loc.graphExistLoc import GraphExistLoc
# settings = Settings()

router = APIRouter()
# query = FusekiQuery(settings.fuseki, 'bk') 

# Graph Exist
@router.get("/loc/exist/{identifiersLccn}", status_code=200) 
async def loc_exist(identifiersLccn: str):

    loc = GraphExistLoc(identifiersLccn) 
    
    return loc 