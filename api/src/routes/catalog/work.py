from fastapi import APIRouter, HTTPException
from src.function.catalog.work.editWork import EditWork
from src.function.catalog.work.deleteWork import DeleteWork
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.function.catalog.work.parserRequestWork import ParserRequestWork
from src.schemas.catalog.work import BfWork
from src.db.models import DbWork 
from src.db.init_db import session
from pyfuseki import FusekiUpdate
from sqlalchemy import exc
from src.function.catalog.work.graphWork import MakeGraphWork
from src.schemas.settings import Settings
from src.function.catalog.solr.work import DocWork
from src.function.catalog.bibframe.bfContributionOf import UpdateFusekiWork, UpdateSolrWork
from src.function.catalog.bibframe.bfSubjectOf import UpdateFusekiSubject, UpdateSolrSubject
from datetime import datetime

router = APIRouter()
settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk') 

@router.post("/create", status_code=201)
async def create_work(request: BfWork): 
    # MariaDB
    # try:
    #     w = DbWork(title=request.title.mainTitle) 
    #     session.add(w) 
    #     session.commit()
    # except exc.IntegrityError as e:
    #     session.rollback()
    #     raise HTTPException(status_code=409, detail="Esse registro já existe")
    # finally:
    #     session.close()
    # [title] = request.title
    w = DbWork(title=request.title.mainTitle) 
    session.add(w) 
    session.commit()
    
    now = datetime.now()
    request.adminMetadata.creationDate = now
    request.adminMetadata.identifiedBy = w.id
    
    # Jena
    graph = MakeGraphWork(request)
    sparql = MakeCreateSparql(graph, w.id, "works")
    response = fuseki.run_sparql(sparql) 

    # Solr
    responseSolr = DocWork(request)  

    if request.contribution:
        UpdateFusekiWork(request.contribution, request.adminMetadata.identifiedBy, 'contributionOf')
        UpdateSolrWork(request.contribution, request.adminMetadata.identifiedBy, request.title.mainTitle, 'contributionOf')

    if request.subject:
        UpdateFusekiWork(request.subject, request.adminMetadata.identifiedBy, 'subjectOf')
        UpdateSolrWork(request.subject, request.adminMetadata.identifiedBy, request.title.mainTitle, 'subjectOf')

    return {
        "id": w.id,
         "jena": response.convert()['message'],
        "solr": responseSolr
        } 

@router.delete("/delete/{work_id}", status_code=201)
async def delete_work(work_id: str): 
    response = DeleteWork(work_id)
    return response

@router.put("/edit/{work_id}", status_code=201)
async def edit_work(request: BfWork, work_id: str): 
    request.adminMetadata.identifiedBy = work_id
    EditWork(request)
    # Solr
    responseSolr = DocWork(request)  
    if request.contribution:
        UpdateFusekiWork(request.contribution, request.adminMetadata.identifiedBy, 'contributionOf')
        UpdateSolrWork(request.contribution, request.adminMetadata.identifiedBy, request.title.mainTitle, 'contributionOf')

    if request.subject:
        UpdateFusekiWork(request.subject, request.adminMetadata.identifiedBy, 'subjectOf')
        UpdateSolrWork(request.subject, request.adminMetadata.identifiedBy, request.title.mainTitle, 'subjectOf')


    return {
        "id": work_id,
        #  "jena": response.convert()['message'],
        "solr": responseSolr
        } 
