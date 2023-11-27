from fastapi import APIRouter, HTTPException
from src.schemas.catalog.bibframe.work import Work
from src.db.models import Catalog
from src.db.init_db import session
from pyfuseki import FusekiUpdate
from sqlalchemy import exc
from src.function.catalog.work.graphWork import MakeGraphWork
from src.schemas.settings import Settings
from src.function.catalog.solr.work import DocWork

router = APIRouter()
settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk') 

@router.post("/create", status_code=201)
async def create_work(request: Work): 
    uri = f'https://bibliokeia.com/catalog/works/{request.identifiersLocal}'

    # MariaDB
    try:
        w = Catalog(id=request.identifiersLocal, type="work", uri=uri) 
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

    return {
        "id": request.identifiersLocal,
         "jena": response.convert()['message'],
        "solr": responseSolr
        } 
