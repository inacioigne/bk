from fastapi import APIRouter, HTTPException
from src.function.catalog.solr.docInstance import DocInstance
from src.function.catalog.bibframe.bfHasInstance import HasInstance
from src.function.catalog.instance.graphInstance import MakeGraphInstance
from src.schemas.catalog.instance import BfInstance
from src.db.models import DbInstance
from src.db.init_db import session
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings

router = APIRouter()
settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk') 

@router.post("/create", status_code=201)
async def create_instance(request: BfInstance): 

    uri = f'https://bibliokeia.com/catalog/instance/{request.identifiersLocal}'
    work_id = request.instanceOf.uri.split("/")[-1]

    i = DbInstance(
            id=request.identifiersLocal,  
            uri=uri,
            work_id=int(work_id)
            ) 
    session.add(i) 
    session.commit()

    graph = MakeGraphInstance(request)
    response = fuseki.run_sparql(graph) 
    HasInstance(request)
    responseSolr = DocInstance(request)

    return {
        "id": request.identifiersLocal,
         "jena": response.convert()['message'],
        # "solr": responseSolr
        } 