from fastapi import APIRouter, HTTPException
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

router = APIRouter()
settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk') 

@router.post("/create", status_code=201)
async def create_work(request: BfWork): 
    uri = f'https://bibliokeia.com/catalog/works/{request.identifiersLocal}'
    request = ParserRequestWork(request)

    # MariaDB
    try:
        w = DbWork(
            id=request.identifiersLocal, 
            title=request.title.mainTitle, 
            uri=uri) 
        session.add(w) 
        session.commit()
    except exc.IntegrityError as e:
        session.rollback()
        raise HTTPException(status_code=409, detail="Esse registro já existe")
    finally:
        session.close()
    
    # Jena
    graph = MakeGraphWork(request)
    response = fuseki.run_sparql(graph) 

    # Solr
    responseSolr = DocWork(request) 

    if request.contribution:
        UpdateFusekiContribution(request)
        UpdateSolrContribution(request)

    if request.subject:
        UpdateFusekiSubject(request)
        UpdateSolrSubject(request)


    return {
        "id": request.identifiersLocal,
         "jena": response.convert()['message'],
        "solr": responseSolr
        } 
