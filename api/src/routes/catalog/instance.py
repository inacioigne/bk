from fastapi import APIRouter, HTTPException
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.function.catalog.solr.docInstance import DocInstance
from src.function.catalog.bibframe.bfHasInstance import HasInstance
from src.function.catalog.instance.graphInstance import MakeGraphInstance
from src.schemas.catalog.instance import BfInstance
from src.db.models import DbInstance
from src.db.init_db import session
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings
from datetime import datetime

router = APIRouter()
settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk') 

@router.post("/create", status_code=201)
async def create_instance(request: BfInstance):  

    work_id = request.instanceOf.value.split("/")[-1]

    i = DbInstance(work_id=int(work_id)) 
    session.add(i) 
    session.commit()

    now = datetime.now()
    request.adminMetadata.creationDate = now
    request.adminMetadata.identifiedBy = i.id

    graph = MakeGraphInstance(request)
    sparql = MakeCreateSparql(graph, i.id, "instances")
    response = fuseki.run_sparql(sparql) 

    hasInstance = HasInstance(request, i.id)
    responseSolr = DocInstance(request)

    return {
        "id": i.id,
        "createInstance": response.convert(),
        "hasInstance": hasInstance,
        "solr": responseSolr
        } 