from fastapi import APIRouter, HTTPException
from src.function.catalog.instance.editInstance import EditInstance
from src.function.catalog.instance.deleteInstance import DeleteInstance
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.function.catalog.solr.docInstance import DocInstance
from src.function.catalog.bibframe.bfHasInstance import HasInstance
from src.function.catalog.instance.graphInstance import MakeGraphInstance
from src.schemas.catalog.instance import BfInstance, Instance_Delete
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

@router.delete("/delete", status_code=201)
async def delete_instance(request: Instance_Delete):  
    response = DeleteInstance(request)
    return response

@router.put("/edit/{instance_id}", status_code=201)
async def edit_instance(request: BfInstance, instance_id: str):
    request.adminMetadata.identifiedBy = instance_id
    now = datetime.now()
    request.adminMetadata.changeDate = now
    response = EditInstance(request)
    # Solr
    responseSolr = DocInstance(request)

    return {
        "id": instance_id,
         "jena": response.convert()['message'],
        "solr": responseSolr
    }
