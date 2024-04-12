from fastapi import APIRouter, HTTPException
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
    EditWork(request)
    # # Solr
    # responseSolr = DocWork(request)
    # if request.contribution:
    #     UpdateFusekiWork(request.contribution,
    #                      request.adminMetadata.identifiedBy, 'contributionOf')
    #     UpdateSolrWork(request.contribution, request.adminMetadata.identifiedBy,
    #                    request.title.mainTitle, 'contributionOf')

    # if request.subject:
    #     UpdateFusekiWork(
    #         request.subject, request.adminMetadata.identifiedBy, 'subjectOf')
    #     UpdateSolrWork(request.subject, request.adminMetadata.identifiedBy,
    #                    request.title.mainTitle, 'subjectOf')

    # # Update Delete authority
    # if request.authorityExclude:
    #     uri_work = f"{settings.base_url}/works/{work_id}"
    #     docs = list()
    #     for i in request.authorityExclude:
    #         sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    #                 DELETE DATA
    #                 {{ GRAPH <{i.value}>
    #                 {{ <{i.value}>  bf:{i.metadata}  <{uri_work}> }} }} ;"""
    #         fuseki.run_sparql(sparql)
    #         id = i.value.split("/")[-1]
    #         doc = {
    #             "id": f"authority#{id}",
    #             f"{i.metadata}": {"remove": {"id": f"authority#{id}/work/work#{work_id}"}}
    #         }
    #         docs.append(doc)
    #     resSolr = solr.add(docs, commit=True)

    # return {
    #     "id": work_id,
    #     #  "jena": response.convert()['message'],
    #     "solr": responseSolr
    # }
    return request.model_dump()