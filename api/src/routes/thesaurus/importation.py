from pyfuseki import FusekiQuery
from src.schemas.settings import Settings
from fastapi import APIRouter, HTTPException
settings = Settings()

router = APIRouter()
query = FusekiQuery(f'{settings.url}:3030', 'authority') 

# Graph Exist
@router.get("/exist/{identifiersLccn}", status_code=200) 
async def loc_exist(identifiersLccn: str):

    ask = f"""PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
ASK {{ graph ?g {{ ?s identifiers:lccn "{identifiersLccn}" }} }}"""

    res = query.run_sparql(ask)
    exist = res.convert()['boolean'] 
    
    return exist 