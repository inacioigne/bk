from fastapi import APIRouter, HTTPException
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
from src.function.catalog.bibframe.bfContributionOf import UpdateFusekiContribution, UpdateSolrContribution
from src.function.catalog.bibframe.bfSubjectOf import UpdateFusekiSubject, UpdateSolrSubject
from datetime import datetime

router = APIRouter()
settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk') 

@router.post("/create", status_code=201)
async def create_work(request: BfWork): 
    # request = ParserRequestWork(request)

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
    
    # # Jena
    graph = MakeGraphWork(request)
    sparql = MakeCreateSparql(graph, w.id, "works")
    response = fuseki.run_sparql(sparql) 

    # # Solr
    responseSolr = DocWork(request, w.id)  

    # if request.contribution:
    #     UpdateFusekiContribution(request, w.id)
    #     UpdateSolrContribution(request, w.id)

    # if request.subject:
    #     UpdateFusekiSubject(request, w.id)
    #     UpdateSolrSubject(request, w.id)


    return {
        "id": w.id,
         "jena": response.convert()['message'],
        "solr": responseSolr
        } 
    # return request.model_dump()
